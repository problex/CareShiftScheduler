import { useState } from "react";
import WeekNavigator from "@/components/WeekNavigator";
import MonthNavigator from "@/components/MonthNavigator";
import WeekCalendar from "@/components/WeekCalendar";
import MonthCalendar from "@/components/MonthCalendar";
import AddShiftModal from "@/components/AddShiftModal";
import ShareModal from "@/components/ShareModal";
import ViewToggle from "@/components/ViewToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Share2, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
  isSameMonth,
  getDay,
} from "date-fns";

interface Shift {
  id: string;
  date: string;
  timeSlot: string;
  shiftName?: string;
  category: "pe-home" | "paul";
}

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [view, setView] = useState<"week" | "month">("week");
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Fetch shifts from API
  const { data: shifts = [], isLoading } = useQuery<Shift[]>({
    queryKey: ["/api/shifts"],
    enabled: !!user,
  });

  // Create shift mutation
  const createShiftMutation = useMutation({
    mutationFn: async (shiftData: { date: string; timeSlot: string; category: string }) => {
      const response = await apiRequest("POST", "/api/shifts", shiftData);
      if (!response.ok) {
        let errorMessage = "Failed to create shift";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shifts"] });
      toast({
        title: "Shift added",
        description: "Your shift has been saved successfully.",
      });
    },
    onError: (error) => {
      console.error("Failed to create shift:", error);
      const message = error instanceof Error ? error.message : "Failed to add shift. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  // Delete shift mutation
  const deleteShiftMutation = useMutation({
    mutationFn: async (shiftId: string) => {
      const response = await apiRequest("DELETE", `/api/shifts/${shiftId}`);
      if (!response.ok) {
        let errorMessage = "Failed to delete shift";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shifts"] });
      toast({
        title: "Shift deleted",
        description: "Your shift has been removed.",
      });
    },
    onError: (error) => {
      console.error("Failed to delete shift:", error);
      const message = error instanceof Error ? error.message : "Failed to delete shift. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) return firstName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return "U";
  };

  const getDaysOfWeek = () => {
    const days = [];
    const today = startOfDay(new Date());
    
    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeekStart, i);
      days.push({
        dayName: format(day, 'EEE'),
        date: parseInt(format(day, 'd')),
        fullDate: format(day, 'yyyy-MM-dd'),
        isToday: isToday(day),
        isPast: isBefore(day, today),
      });
    }
    return days;
  };

  const getDaysOfMonth = () => {
    const days = [];
    const today = startOfDay(new Date());
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    const startDay = getDay(monthStart);
    const adjustedStartDay = startDay;
    
    const calendarStart = addDays(monthStart, -adjustedStartDay);
    
    for (let i = 0; i < 35; i++) {
      const day = addDays(calendarStart, i);
      days.push({
        date: parseInt(format(day, 'd')),
        fullDate: format(day, 'yyyy-MM-dd'),
        isToday: isToday(day),
        isPast: isBefore(day, today),
        isCurrentMonth: isSameMonth(day, currentMonth),
      });
    }
    
    return days;
  };

  const getWeekRange = () => {
    const end = addDays(currentWeekStart, 6);
    return `${format(currentWeekStart, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  };

  const getMonthYear = () => {
    return format(currentMonth, 'MMMM yyyy');
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleTodayWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 0 }));
  };

  const handleTodayMonth = () => {
    setCurrentMonth(new Date());
  };

  const handleAddShift = (date: string) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleConfirmAddShift = (timeSlot: string, shiftName: string, category: string) => {
    createShiftMutation.mutate({
      date: selectedDate,
      timeSlot,
      category,
    });
  };

  const handleDeleteShift = (shiftId: string) => {
    deleteShiftMutation.mutate(shiftId);
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    const date = new Date(selectedDate);
    return format(date, 'EEE, MMM d');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading your shifts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between p-4 gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShareModalOpen(true)}
            data-testid="button-share"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <ViewToggle view={view} onViewChange={setView} />
          <div className="flex items-center gap-3 ml-auto">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.profileImageUrl || undefined} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {view === "week" ? (
        <>
          <WeekNavigator
            weekRange={getWeekRange()}
            onPreviousWeek={handlePreviousWeek}
            onNextWeek={handleNextWeek}
            onToday={handleTodayWeek}
          />
          <WeekCalendar
            days={getDaysOfWeek()}
            shifts={shifts}
            onAddShift={handleAddShift}
            onDeleteShift={handleDeleteShift}
          />
        </>
      ) : (
        <>
          <MonthNavigator
            monthYear={getMonthYear()}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleTodayMonth}
          />
          <MonthCalendar
            days={getDaysOfMonth()}
            shifts={shifts}
            onAddShift={handleAddShift}
            onDeleteShift={handleDeleteShift}
          />
        </>
      )}

      <AddShiftModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddShift={handleConfirmAddShift}
        selectedDate={formatSelectedDate()}
      />

      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shifts={shifts}
      />
    </div>
  );
}
