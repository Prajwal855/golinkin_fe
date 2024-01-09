
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import Signup from './components/SignUp';
import Login from './components/Login';
import OTPConfirmation from './components/Otpscreen';
import Profiles from './components/Profile';
import QuizForm from './components/QuizForm';
import QuizQuestions from './components/QuizQuestions';
import Result from './components/Result';
import Home from './components/Home';
import Termsandcondition from './components/TermsandCondition';
import Company from './components/Company';
import CompanySignup from './components/CompanySignUp';
import UserIntro from './components/UserIntro';
import Articals from './components/Articals';
import Chat from './components/Chat';
import CreateJob from './components/CreateJob';
import People from './components/People';
import Jobs from './components/Jobs';



function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/otp_confirmation' element={<OTPConfirmation />} />
      <Route path='/profile' element={<Profiles />} />
      <Route path='/Quiz_form' element={<QuizForm />} />
      <Route path='/Quiz' element={<QuizQuestions />} />
      <Route path='/Result' element={<Result />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/terms_and_condition' element={<Termsandcondition />} />
      <Route path='/CompanyProfile' element={<Company />} />
      <Route path='/CompanySignUp' element={<CompanySignup />} />
      <Route path='/Intro' element={<UserIntro />} />
      <Route path='/Articales' element={<Articals />} />
      <Route path='/Chat' element={<Chat />} />
      <Route path='/CreateJobs' element={<CreateJob />} />
      <Route path='/People' element={<People />} />
      <Route path='/Jobs' element={<Jobs />} />
    </Routes>
  );
}

export default App;