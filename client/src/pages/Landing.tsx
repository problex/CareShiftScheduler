import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Share2, Users } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Shift Scheduler</h1>
          </div>
          <Button onClick={handleLogin} data-testid="button-login">
            Log In
          </Button>
        </header>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Manage Your Shifts with Ease
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            A simple, fast shift scheduling app for care workers. Track your shifts across PE Home and Paul assignments with calendar views and easy sharing.
          </p>
          <Button size="lg" onClick={handleLogin} data-testid="button-get-started">
            Get Started
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="p-6">
            <Calendar className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Calendar Views</h3>
            <p className="text-sm text-muted-foreground">
              Switch between week and month views to see your schedule at a glance
            </p>
          </Card>

          <Card className="p-6">
            <Clock className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Quick Entry</h3>
            <p className="text-sm text-muted-foreground">
              Add shifts with just a few taps. Categories auto-assign based on time slots
            </p>
          </Card>

          <Card className="p-6">
            <Share2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Easy Sharing</h3>
            <p className="text-sm text-muted-foreground">
              Generate shareable links to let others view your schedule
            </p>
          </Card>

          <Card className="p-6">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Multiple Categories</h3>
            <p className="text-sm text-muted-foreground">
              Track shifts for PE Home and Paul with color-coded organization
            </p>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Built for care workers to manage their shifts efficiently</p>
        </footer>
      </div>
    </div>
  );
}
