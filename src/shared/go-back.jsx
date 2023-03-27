import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <IconButton
      sx={{ fontSize: '13px', borderRadius: '4px', my: 1 }}
      onClick={goBack}
    >
      <ArrowBackIosNewIcon /> Go Back
    </IconButton>
  );
};

export default GoBack;
