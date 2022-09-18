import React from 'react';

const useChekMobileScreen = () => {
  const [mobile, setMobile] = React.useState(window.innerWidth <= 650);

  const handleWindowSizeChange = () => {
    if (window.innerWidth <= 650 && !mobile) setMobile(true);
    else if (window.innerWidth > 650 && mobile) setMobile(false);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () =>
      window.removeEventListener('resize', handleWindowSizeChange);
  }, [mobile]);

  return mobile;
};

export default useChekMobileScreen;
