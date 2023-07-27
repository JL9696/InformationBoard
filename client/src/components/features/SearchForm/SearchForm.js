import Button from '../button/button';
import TextInput from '../TextInput/TextInput';
import styles from './SearchForm.module.scss';

const SearchForm = () => {
  return(
    <form className={styles.search}>
      <TextInput placeholder='enter a phrasesearch' />
      <Button>Search</Button>
    </form>
  )
};

export default SearchForm;