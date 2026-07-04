import { Button, Input, LoadingSpinner } from "@/components/common";
import { useAuth } from "@/context/AuthProvider";
import { Routes } from "@/types/enums";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import styles from "./Login.module.scss";

const Login = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: string } | null)?.from ?? Routes.PRODUCTS;

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return <LoadingSpinner label="Provjera prijave..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ username, password });
      navigate(from, { replace: true });
    } catch {
      setError("Neispravno korisničko ime ili lozinka.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <h1 id="login-title" className={styles.title}>
          Prijava
        </h1>
        <p className={styles.subtitle}>
          Prijavite se kako biste pristupili favoritima
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            label="Korisničko ime"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Lozinka"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Prijava…" : "Prijavi se"}
          </Button>
        </form>

        <p className={styles.hint}>
          Demo račun DummyJSON: <code>emilys</code> / <code>emilyspass</code>
        </p>
      </section>
    </div>
  );
};

export default Login;
