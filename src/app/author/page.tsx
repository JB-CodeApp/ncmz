import { redirect } from 'next/navigation';

const CategoryPage = () => {
  redirect('/blog');
  
  return null;
};

export default CategoryPage;
