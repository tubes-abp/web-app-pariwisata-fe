import { Modal } from 'antd';
import axios from 'axios';
import { setAxios } from '../../helper/defaults';

export const toggle_loader = (bool) => ({
  type: 'TOGGLE_LOADER',
  bool
})

export const put_data = (key, data) => ({
    type: "PUT_DATA",
    key,
    data
})

export const auth_login = (role, payload, history) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    axios
      .post('/auth/login-'+role, payload)
      .then((res) => {
        console.log(res)
        dispatch(modal_success("Berhasil Login"));
        window.localStorage.setItem('token', res.data.access_token);
        setAxios();
        history.push(`/${role}/dashboard`);
      })
      .catch((err) => {      
        console.log(err?.response?.data?.message);
        dispatch(error(err?.response?.data?.message));
      })
      .then(() => {
        dispatch(toggle_loader(false));
      });
  }
}

export const get_data = (url, state_key) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    axios
      .get(url)
      .then((resp) => {
        let data = resp.data.data;
        if(Array.isArray(data)) {
          data = data.map((dt) => {
            return {
              ...dt,
              key: dt.id
            }
          })
        }
        dispatch(put_data(state_key, data))
      })
      .catch((err) => {
        console.log(err);
        dispatch(error(err?.response?.data?.message));
      })
      .then(() => {
        dispatch(toggle_loader(false));
      });
  }
}

export const post_data = (url, payload, history, nextPage) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    axios
      .post(url, payload)
      .then((res) => {
        dispatch(modal_success(res.data?.message));
        history.push(nextPage);
      })
      .catch((err) => {
        console.log(err);
        dispatch(error("There are something went wrong"));
      })
      .then(() => {
        dispatch(toggle_loader(false));
      });
  }
}

export const post_transaction = (payload, history) => {
  return (dispatch) => {
    console.log(payload);
    dispatch(toggle_loader(true));
    axios
      .post('/transactions', payload[0])
      .then((res) => {
        if(payload.length > 1 ) {
          payload = payload.slice(1);
          dispatch(post_transaction(payload, history));
        } else {
          dispatch(modal_success(res.data?.message));
          history.push("/cashier/data/transaction");
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(error("There are something went wrong"));
      })
      .then(() => {
        dispatch(toggle_loader(false));
      });
  }
}

export const change_password = (url, payload, history, nextPage) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    axios
      .patch(url, payload)
      .then((res) => {
        dispatch(modal_success(res.data?.message));
        let urlLink = nextPage.split("/")[1];
        if(urlLink === "login"){
          window.localStorage.removeItem("token");
        }
        history.push(nextPage);
      })
      .catch((err) => {
        console.log(err);
        dispatch(error("There are something went wrong"));
      })
      .then(() => {
        dispatch(toggle_loader(false));
      });
  }
}

export const update_data = (url, payload, history, nextPage) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    axios
      .put(url, payload)
      .then((res) => {        
        dispatch(modal_success(res.data?.message));
        history.push(nextPage);
      })
      .catch((err) => {
        console.log(err);
        dispatch(error("There are something went wrong"));
      })
      .then(() => {
        dispatch(toggle_loader(false));
      });
  }
}

export const update_img_product = (id, payload, history) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    const formData = new FormData();
    formData.append('img', payload.img);
    axios
      .post(`/products/${id}/change-img`, formData)
      .then((resp) => {
        history.push('/owner/data/product');
        dispatch(modal_success(resp.data?.message));
      })
      .catch((err) => {      
        dispatch(error("There are something went wrong"));
        console.log(err);
      })
      .then(() => {
        dispatch(toggle_loader(false));
      });
  }
}

export const delete_data = (url, id, state_key) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    axios
      .delete(`${url}/${id}`)
      .then((res) => {        
        console.log(res)
        dispatch(modal_success(res.data?.message));
      })
      .catch((err) => {
        console.log(err);
        dispatch(error("There are something went wrong"));
      })
      .then(() => {
        dispatch(toggle_loader(false));
        dispatch(get_data(url, state_key))
      });
  }
}

export const modal_success = (msg) => {
  return () => {
    Modal.success({
      content: msg,
      centered: true,
    });
  }
}

export const error = (msg) => {
  return () => {
    Modal.error({
      title: 'Error!!',
      content: msg,
      centered: true,
    });
  }
}