import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Printer, Check } from "lucide-react";
import { useState } from "react";
import { format, parseISO } from "date-fns";

interface Shift {
  id: string;
  date: string;
  timeSlot: string;
  shiftName?: string;
  category: "pe-home" | "paul";
}

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  shifts: Shift[];
}

export default function ShareModal({ open, onClose, shifts }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    if (shifts.length === 0) {
      return "No shifts scheduled";
    }

    const sortedShifts = [...shifts].sort((a, b) => 
      a.date.localeCompare(b.date)
    );

    let text = "MY SHIFT SCHEDULE\n";
    text += "=" + "=".repeat(50) + "\n\n";

    sortedShifts.forEach((shift) => {
      const date = parseISO(shift.date);
      const dateStr = format(date, 'EEE, MMM d, yyyy');
      const categoryLabel = shift.category === "pe-home" ? "PE Home" : "Paul";
      text += `${dateStr}\n`;
      text += `  ${shift.shiftName || ""} - ${shift.timeSlot}\n`;
      text += `  Location: ${categoryLabel}\n\n`;
    });

    text += "=" + "=".repeat(50) + "\n";
    text += `Total shifts: ${shifts.length}`;

    return text;
  };

  const handleCopyToClipboard = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePrint = () => {
    const text = generateShareText();
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Shift Schedule</title>
            <style>
              body {
                font-family: 'Inter', sans-serif;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
              }
              pre {
                white-space: pre-wrap;
                font-family: 'Inter', monospace;
                line-height: 1.6;
              }
              @media print {
                body { padding: 20px; }
              }
            </style>
          </head>
          <body>
            <pre>${text}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" data-testid="modal-share">
        <DialogHeader>
          <DialogTitle data-testid="text-share-title">Share Schedule</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Card className="p-4 bg-muted">
            <pre className="text-xs whitespace-pre-wrap font-mono overflow-auto max-h-64">
              {generateShareText()}
            </pre>
          </Card>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCopyToClipboard}
              data-testid="button-copy-schedule"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handlePrint}
              data-testid="button-print-schedule"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Copy your schedule to share via text, email, or messaging apps
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
