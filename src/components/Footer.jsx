const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer>
      <p>© {anioActual} Trecoop - Cooperativa de Construcción</p>
    </footer>
  );
};

export default Footer;
