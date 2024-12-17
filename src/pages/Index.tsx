import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) navigate("/quiz");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
              appearance={{ theme: ThemeSupa }}
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