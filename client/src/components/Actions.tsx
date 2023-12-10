import { Box, SxProps } from '@mui/material';

export interface ActionProps {
  /**
   * Where should the buttons be aligned within the component?
   */
  alignItems?: string;
  /**
   * Children to render within Action component. This should be the group of buttons.
   */
  children?: React.ReactNode;
  /**
   * Class applied to Action container
   */
  className?: string;
  /**
   * How should the container justify its contents?
   */
  justifyContent?: string;
  sx?: SxProps;
}

const Actions = (props: ActionProps) => {
  const { alignItems = 'center', justifyContent = 'flex-end', sx = {}, ...other } = props;

  return (
    <Box
      display="flex"
      flex="0 0 auto"
      gap={2}
      sx={{
        ...sx,
        '& .MuiButton-text:not(:last-child), & :not(:last-child) .MuiButton-text': {
          mr: 1,
        },
        '& .MuiButton-text:not(:first-of-type), & :not(:first-of-type) .MuiButton-text': {
          ml: 1,
        },
      }}
      {...{ alignItems, justifyContent, ...other }}
    />
  );
};

export default Actions;
