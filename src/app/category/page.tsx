import { redirect } from 'next/navigation';

const AuthorPage = () => {
  redirect('/blog');
  
  return null;
};

export default AuthorPage;
