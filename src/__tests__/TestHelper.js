/* eslint-disable react/forbid-foreign-prop-types */
import checkPropTypes from 'check-prop-types';

export const findByAttr = (component, attribute) => component.find(`[data-test='${attribute}']`);

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
  return propsErr;
};

export const apiResponse = (number = 20) => {
  const data = [];
  for (let i = 0; i <= number; i += 1) {
    data.push({
      id: i,
      name: `Name${i}`,
      phone: [
        {
          label: 'work',
          value: `+000 000 0000 ${i}`,
          primary: true
        }],
      email: [
        {
          label: 'work',
          value: 'john@gmail.com',
          primary: true
        }
      ],
      picture_id: {
        pictures: {
          128: 'https://www.gstatic.com/webp/gallery3/1.sm.png'
        }
      },
      e80927bf538ab0f90854b97d28a677a12639d62a: 'Derrick Santos',
      cbc8ad54003239431c1cde5c2d79378b8c4c5211: 'Wesentle Dev',
      '783dafde54ea51ce69139af515955b60df27219a': 'Porto, Portugal',
      org_name: `Org name ${i}`,
    });
  }

  return { success: true, data };
};
