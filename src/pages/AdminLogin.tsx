import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, isAdmin, user, loading } = useAuth();
  const navigate = useNavigate();

  // If already logged in as admin, redirect
  if (!loading && user && isAdmin) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (isSignUp) {
      const { error } = await signUp(email, password);
      setBusy(false);
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created!", description: "You can now sign in." });
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      setBusy(false);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        setTimeout(() => navigate("/admin/dashboard"), 300);
      }
    }
  };

  return (
    <div className="min-h-screen bg-cafe-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-card rounded-lg p-8 shadow-xl border border-border">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            MODERN<span className="text-accent"> CAFE</span>
          </h1>
          <p className="font-body text-muted-foreground text-sm mt-2">{isSignUp ? "Create Account" : "Admin Login"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" className="font-body">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password" className="font-body">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full font-body" disabled={busy}>
            {busy ? (isSignUp ? "Creating account…" : "Signing in…") : (isSignUp ? "Sign Up" : "Sign In")}
          </Button>
        </form>

        <p className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-body text-sm text-accent hover:text-primary transition-colors"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
        </p>

        <p className="text-center mt-6">
          <a href="/" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
