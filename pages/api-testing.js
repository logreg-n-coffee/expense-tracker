const APITesting = () => {
  const files = fetch('/api/google-sheets/spreadsheets')
    .then((response) => response.json())
    .then(console.log)
    .catch(console.error);

  return (
    <div>
        <p>Testing environment</p> <br />
        <p>{JSON.stringify(files)}</p>
    </div>
  );
};

export default APITesting;
