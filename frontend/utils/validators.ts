export const validateQuizTitle = (value: string) => {
  const TITLE_PATTERN = /^[a-zA-Z0-9 _?-]+$/;

  if (!value || value.trim() === '') {
    return 'Quiz title is required';
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length < 3 || trimmedValue.length > 50) {
    return 'Title must be 3-50 characters long';
  }

  if (!TITLE_PATTERN.test(trimmedValue)) {
    return 'Only letters, numbers, spaces, _ - and ? are allowed';
  }

  return undefined;
};
