import { Nav } from '../components/Nav';

export const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      <Nav />
      <main className="container mx-auto px-20 py-10 w-30 h-full">
        {children}
      </main>
    </div>
  );
};
