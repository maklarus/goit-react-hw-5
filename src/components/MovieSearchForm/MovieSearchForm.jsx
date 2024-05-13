import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

export default function MovieSearchForm({ handleSubmit }) {
  const notify = () => {
    toast.error('Search field must be field!', {
      duration: 2250,
      position: 'top-right',
    });
  };

  const UserSchema = Yup.object().shape({
    search: Yup.string()
      .trim()
      .min(3, 'Min 3 chars!')
      .max(50, 'Max 50 chars!')
      .required('is required!'),
  });

  const initialValues = {
    search: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserSchema}
      onSubmit={(values, actions) => {
        if (values.search.trim() !== '') {
          handleSubmit(values.search);
          actions.resetForm();
        } else {
          notify();
        }
      }}
    >
      <Form>
        <Field type="text" name="search"></Field>
        <button type="submit">Search</button>
        <ErrorMessage name="search" component="span" />
      </Form>
    </Formik>
  );
}
