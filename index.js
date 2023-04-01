import { fetchUserData, fetchRepositories } from './scripts/fetchData.js';
import { renderUserData } from './scripts/user.js';

import { renderRepos, cleanReposList } from './scripts/repos.js';
import { showSpinner, hideSpinner } from './scripts/spinner.js';


const defaultUser = {
  avatar_url: 'https://avatars3.githubusercontent.com/u10001',
  name: '',
  location: '',
};
renderUserData(defaultUser);

const showUserBtnElem = document.querySelector('.name-form__btn');
const userNameInputElem = document.querySelector('.name-form__input');

const onSearchUser = () => {
  showSpinner();
  cleanReposList();
  const userName = userNameInputElem.value;
  fetchUserData(userName)
    .then((userData) => {
      renderUserData(userData);
      return userData.repos_url;
    })
    .then((url) => fetchRepositories(url))
    .then((reposList) => {
      renderRepos(reposList);
      hideSpinner();
    })
    .catch((err) => {
      hideSpinner();
      alert(err.message);
    });
};

showUserBtnElem.addEventListener('click', onSearchUser);
