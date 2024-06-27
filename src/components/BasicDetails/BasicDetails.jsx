import React from 'react';
import { TextField, Box, Button, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
  description: Yup.string().required('Description is required').min(3, 'Description must be at least 3 characters long'),
  price: Yup.string().required('Price is required'),
});

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price.toString(), // Ensure price is treated as a string
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setPropertyDetails((prev) => ({
      ...prev,
      title: data.title,
      description: data.description,
      price: data.price, // Assuming price is stored as a string based on Object 2
    }));
    nextStep();
  };

  return (
    <Box maxWidth="50%" mx="auto" my={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Title"
              placeholder="Property Name"
              error={!!errors.title}
              helperText={errors.title?.message}
              margin="normal"
              required
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Description"
              placeholder="Description"
              error={!!errors.description}
              helperText={errors.description?.message}
              margin="normal"
              required
              multiline
              rows={4}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Price"
              placeholder="1000"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message}
              margin="normal"
              required
            />
          )}
        />
        <Grid container spacing={2} justifyContent="center" marginTop={2}>
          <Grid item>
            <Button variant="outlined" onClick={prevStep}>Back</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">Next step</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default BasicDetails;
