import axios from 'axios';
import { showAlert } from './alerts';

export const updateUserData = async (name, email) => {
  try {
    const result = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/update-me',
      data: {
        name,
        email,
      },
    });

    if (result.data.status === 'success') {
      showAlert('success', 'User data updated successfully');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
