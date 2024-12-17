import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        toast({
          title: "Successfully logged in!",
          description: "Welcome to Bible Quiz!",
        });
        navigate("/quiz");
      } else if (_event === 'SIGNED_OUT') {
        setSession(null);
      } else if (_event === 'USER_SIGNED_OUT') {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "There was a problem with authentication. Please try again.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  if (!session) {
    return (
      <div className="container mx-auto max-w-md p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold mb-4">Bible Quiz Game</CardTitle>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#3b82f6',
                      brandAccent: '#2563eb',
                    },
                  },
                },
              }}
              theme="light"
              providers={[]}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-xl p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Bible Quiz!</h1>
      <Card className="mb-6">
        <CardContent className="p-6">
          <p className="text-lg mb-4">Test your knowledge of the Bible with our interactive quiz game!</p>
          <Button onClick={() => navigate("/quiz")} size="lg" className="w-full">
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;