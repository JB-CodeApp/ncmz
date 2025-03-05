import { redirect } from 'next/navigation';

const TagPage = () => {
  redirect('/blog');
  
  return null;
};

export default TagPage;
