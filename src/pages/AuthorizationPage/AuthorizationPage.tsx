import s from './authorization.module.scss'


import Container from "../../components/Container/Container";
import AuthorizationForm from "../../components/AuthorizationForm/AuthorizationForm";

const AuthorizationPage = () => {
  return (
    <main>
      <section className={s.section}>
        <Container>
          <div className={s.wrapper}>
            <AuthorizationForm />
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AuthorizationPage;
