import React from 'react';

const MainFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; Gravitacional Spa {currentYear}</span>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;