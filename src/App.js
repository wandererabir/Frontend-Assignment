import './App.css';
import React, { useState, useEffect } from 'react';

const SelectOption = ({ options, value, onChange }) => (
  <select value={value} onChange={onChange}>
    <option value="">Select an option</option>
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);

function App() {
  const [args, setArgs] = useState([{ name: '', value: false }]);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState('undefined');
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [andValues, setAndValues] = useState({ value1: '', value2: '' });

  const handleAddArg = () => {
    setArgs([...args, { name: '', value: false }]);
  };

  const handleArgChange = (index, value) => {
    const updatedArgs = [...args];
    updatedArgs[index].name = value;
    setArgs(updatedArgs);
  };

  const handleValueChange = (index, value) => {
    const updatedArgs = [...args];
    updatedArgs[index].value = value === 'true';
    setArgs(updatedArgs);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setResult('undefined');
  };

  const handleResult = (event) => {
    setResult(event.target.value);
  };

  const handleAndValueChange = (event, value) => {
    setAndValues((prevValues) => ({
      ...prevValues,
      [value]: event.target.value,
    }));
  };

  const handleResetResult = () => {
    setResult('undefined');
    setResult1('');
    setResult2('');
    setAndValues('');
    setSelectedOption('');
  };

  useEffect(() => {
    if (selectedOption) {
      handleCalculateResult();
    }
  }, [selectedOption, result1, result2]);

  const renderSelect = (value, handleChange, renderOptions) => (
    <select value={value} onChange={handleChange}>
      {renderOptions()}
    </select>
  );

  const renderArgumentOptions = () => (
    <>
      <option value="">Select an argument</option>
      {args.map((arg, index) => (
        <option key={index} value={arg.value.toString()}>
          {arg.name}
        </option>
      ))}
    </>
  );

  const renderResultOptions = () => (
    <>
      <option value="true">True</option>
      <option value="false">False</option>
    </>
  );

  const handleCalculateResult = () => {
    let calculatedResult;

    switch (selectedOption) {
      case 'constant':
        calculatedResult = result === 'true';
        break;
      case 'args':
        const arg1 = args.find((arg) => arg.name === result)?.value || false;
        calculatedResult = arg1 === true;
        break;
      case 'and':
        if (result1 !== '' && result2 !== '') {
          calculatedResult = result1 === 'true' && result2 === 'true';
        } else {
          calculatedResult = 'undefined';
        }
        break;
      case 'or':
        if (result1 !== '' && result2 !== '') {
          calculatedResult = result1 === 'true' || result2 === 'true';
        } else {
          calculatedResult = 'undefined';
        }
        break;
      default:
        calculatedResult = 'undefined';
        break;
    }

    setResult(calculatedResult.toString());
  };

  return (
    <div>
      <div>
        <label>Argument Name:</label>
        {args.map((arg, index) => (
          <div key={index}>
            <input
              type="text"
              value={arg.name}
              onChange={(e) => handleArgChange(index, e.target.value)}
            />
            {renderSelect(
              arg.value.toString(),
              (e) => handleValueChange(index, e.target.value),
              renderResultOptions
            )}
          </div>
        ))}
        <button onClick={handleAddArg}>Add New Arg</button>
      </div>

      <div>
        {renderSelect(selectedOption, handleOptionChange, () => (
          <>
            <option value="">Select</option>
            <option value="constant">Constant</option>
            <option value="args">Args</option>
            <option value="and">And</option>
            <option value="or">Or</option>
          </>
        ))}

        {selectedOption === 'constant' && (
          <SelectOption
            options={['true', 'false']}
            value={result}
            onChange={handleResult}
          />
        )}

        {selectedOption === 'args' && (
          <select value={result} onChange={(e) => setResult(e.target.value)}>
            {renderArgumentOptions()}
          </select>
        )}

        {(selectedOption === 'and' || selectedOption === 'or') && (
          <ul>
            <li>
            {renderSelect(
              andValues.value1,
              (e) => handleAndValueChange(e, 'value1'),
              () => (
                <>
                  <option value="">Select</option>
                  <option value="constant">Constant</option>
                  <option value="args">Args</option>
                </>
              )
            )}

            {andValues.value1 === 'constant' && (
              <>
              <SelectOption
                options={['true', 'false']}
                value={result1}
                onChange={(e) => setResult1(e.target.value)}
              />
               <button onClick={() => {
          setResult1('');
          setAndValues({ ...andValues, value1: '' });
        }}>Reset</button>
              </>
            )}

            {andValues.value1 === 'args' && (
              <>
              <select value={result1} onChange={(e) => setResult1(e.target.value)}>
                {renderArgumentOptions()}
              </select>
              <button onClick={() => {
          setResult1('');
          setAndValues({ ...andValues, value1: '' });
        }}>Reset</button>
              </>
            )}
            </li>

            <li>
            {renderSelect(
              andValues.value2,
              (e) => handleAndValueChange(e, 'value2'),
              () => (
                <>
                  <option value="">Select</option>
                  <option value="constant">Constant</option>
                  <option value="args">Args</option>
                </>
              )
            )}

            {andValues.value2 === 'constant' && (
              <>
              <SelectOption
                options={['true', 'false']}
                value={result2}
                onChange={(e) => setResult2(e.target.value)}
              />
              <button onClick={() => {
                setResult2('');
                setAndValues({ ...andValues, value2: '' });
              }}>Reset</button>
              </>
            )}

            {andValues.value2 === 'args' && (
              <>
              <select value={result2} onChange={(e) => setResult2(e.target.value)}>
                {renderArgumentOptions()}
              </select>
                            <button onClick={() => {
                              setResult2('');
                              setAndValues({ ...andValues, value2: '' });
                            }}>Reset</button>
              </>
            )}
            </li>
          </ul>
        )}

<button onClick={handleResetResult}>Reset</button>

        <p>Result: {result}</p>
      </div>
    </div>
  );
}

export default App;
