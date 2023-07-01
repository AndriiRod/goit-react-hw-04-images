import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaRegGrinBeam } from 'react-icons/fa';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  Label,
  Input,
} from './Searchbar.styled';

const Searchbar = ({ enterNewSearchValue }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      input: '',
    },
  });
  const handleSubmitForm = data => {
    const formattedInput = data.input.toLowerCase().trim();
    if (formattedInput === '') {
      toast.info('Request cannot be empty');
      return;
    }
    enterNewSearchValue(formattedInput);
    reset();
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit(handleSubmitForm)}>
        <SearchFormButton type="submit">
          <FaRegGrinBeam size={20} />
          <Label>Search</Label>
        </SearchFormButton>

        <Input
          {...register('input')}
          type="text"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBar>
  );
};

export default Searchbar;
