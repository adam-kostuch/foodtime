import { Link, Toolbar, styled } from '@mui/material';

const StyledFooter = styled('footer')({
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.7), 0px 4px 5px 0px rgba(0,0,0,0.7), 0px 1px 10px 0px rgba(0,0,0,0.7)',
});

const Footer = () => {
  return (
    <StyledFooter>
      <Toolbar>
        Created by{' '}
        <Link href="https://github.com/adam-kostuch" target="_blank" pl={0.5}>
          @adam-kostuch
        </Link>
        , 2023
      </Toolbar>
    </StyledFooter>
  );
};

export default Footer;
