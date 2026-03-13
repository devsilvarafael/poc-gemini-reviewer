import { LoginForm } from "@/features/auth/components/login-form";
import { UserProfile } from "@/features/profile/components/user-profile";

export const LoginPage = () => {
  const handleEditProfile = () => {
    // Lógica para editar perfil será implementada futuramente
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h1>Bem-vindo</h1>
        <LoginForm />
        <UserProfile
          name="João Silva"
          email="joao@example.com"
          role="Administrador"
          avatarUrl="https://via.placeholder.com/150"
          onEditProfile={handleEditProfile}
        />
      </div>
    </main>
  );
};
