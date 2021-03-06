import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { BsBag } from 'react-icons/bs';

import FormInformationBlock from 'containers/FormInformationBlock';
import Modal from 'containers/Modal';
import Input from 'components/Input';
import { FixedButton } from 'components/FixedButton';
import { initialOrder } from 'constants/orders';
import { desktopMedia, mobileMedia, tabletMedia } from 'constants/media';
import { orderSchema } from 'validations/order';
import { IOrder } from 'typings/order';
import { Columns } from '../Columns';
import { useMediaQuery } from 'hooks/media';

interface IOrderFormProps {
  handleSubmit: (values: IOrder) => void;
}

const OrderForm: React.FC<IOrderFormProps> = ({ handleSubmit }) => {
  const [columnsQuantity, setColumnsQuantity] = useState(1);

  const isDesktop = useMediaQuery(desktopMedia);
  const isTablet = useMediaQuery(tabletMedia);
  const isMobile = useMediaQuery(mobileMedia);

  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setColumnsQuantity(3);
    }
    if (isTablet) {
      setColumnsQuantity(2);
    }
    if (isMobile) {
      setColumnsQuantity(1);
    }
  }, [isDesktop, isTablet, isMobile]);

  const onSubmit = useCallback(
    async (
      values: IOrder,
      { setSubmitting, setErrors, resetForm }: FormikHelpers<IOrder>,
    ) => {
      handleSubmit(values);
      closeModal();
      setSubmitting(false);
      setErrors({});
      resetForm();
    },
    [handleSubmit, closeModal],
  );

  return (
    <Formik
      validationSchema={orderSchema}
      initialValues={initialOrder}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit: handleSubmitForm,
      }) => (
        <Form onSubmit={handleSubmitForm}>
          <Columns quantity={columnsQuantity}>
            <FormInformationBlock title='Personal information'>
              <Input
                type='text'
                name='firstName'
                label='First Name'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && errors.firstName}
                required
              />
              <Input
                type='text'
                name='lastName'
                label='Last Name'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && errors.lastName}
                required
              />
              <Input
                type='text'
                name='phone'
                label='Phone number'
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && errors.phone}
                required
              />
              <Input
                type='text'
                name='email'
                label='Email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                required
              />
            </FormInformationBlock>

            <FormInformationBlock title='Shipping'>
              <Input
                type='text'
                name='country'
                label='Country'
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.country && errors.country}
                required
              />
              <Input
                type='text'
                name='city'
                label='City'
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && errors.city}
                required
              />
              <Input
                type='text'
                name='street'
                label='Street'
                value={values.street}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.street && errors.street}
                required
              />
              <Input
                type='text'
                name='apartment'
                label='Apartment'
                value={values.apartment}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.apartment && errors.apartment}
                required
              />
              <Input
                type='number'
                name='postCode'
                label='Post code'
                value={values.postCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.postCode && errors.postCode}
                required
              />
            </FormInformationBlock>

            <FormInformationBlock title='Payment details'>
              <Input
                type='number'
                name='cardNumber'
                label='Card number'
                value={values.cardNumber}
                placeholder='0000 0000 0000 0000'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cardNumber && errors.cardNumber}
                required
              />
              <Input
                type='text'
                name='cardHolder'
                label='Card holder'
                value={values.cardHolder}
                placeholder='John Doe'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cardHolder && errors.cardHolder}
                required
              />
              <Input
                type='text'
                name='expiryDate'
                label='Expiry date'
                value={values.expiryDate}
                placeholder='MM/YY'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.expiryDate && errors.expiryDate}
                required
              />
              <Input
                type='number'
                name='cvcCode'
                label='CVC code'
                value={values.cvcCode}
                placeholder='123'
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cvcCode && errors.cvcCode}
                required
              />
            </FormInformationBlock>
          </Columns>
          <FixedButton
            type='button'
            primary
            bottom='3rem'
            right='3rem'
            onClick={openModal}
          >
            <BsBag />
          </FixedButton>
          <Modal
            title='Confirm the order?'
            visible={visible}
            onSubmit={handleSubmitForm}
            onCancel={closeModal}
            maxWidth='350px'
            submitText='Yes'
            cancelText='No'
          />
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
