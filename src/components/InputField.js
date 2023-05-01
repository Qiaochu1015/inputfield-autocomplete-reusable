import React, { useEffect, useState, useRef } from "react";

function InputField({ options = [], value = "", onChange, open = "false" }) {
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [keyword, setKeyword] = useState(value);
	const [isDropped, setIsDropped] = useState(open);
	const [isFocused, setIsFocused] = useState(false);
	const [selectIndex, setSelectIndex] = useState(-1);

	const inputRef = useRef(null);

	useEffect(() => {
		setFilteredOptions(
			options.filter((option) =>
				option.title.toLowerCase().includes(keyword.toLowerCase())
			)
		);
		onChange?.({ target: { value: keyword } });
	}, [keyword, options]);

	useEffect(() => {
		setIsDropped(open);
	}, [open]);

	useEffect(() => {
		setSelectIndex(-1);
	}, [isDropped]);

	useEffect(() => {
		setKeyword(value);
	}, [value]);

	useEffect(() => {
		setIsDropped(isFocused);
	}, [isFocused]);

	const handleKeyDown = (e) => {
		const key = e.key;
		const maxItems = options.length;
		if (key === "ArrowDown") {
			if (selectIndex >= maxItems - 1) {
				setSelectIndex(0);
			} else {
				setSelectIndex((prev) => prev + 1);
			}
		} else if (key === "ArrowUp") {
			if (selectIndex <= 0) {
				setSelectIndex(maxItems - 1);
			} else {
				setSelectIndex((prev) => prev - 1);
			}
		} else if (key === "Enter") {
			setKeyword(filteredOptions[selectIndex].name);
		}
	};

	const handleFocus = (bool) => {
		setIsFocused(bool);
	};

	const handleClear = () => {
		inputRef.current.focus();
		setKeyword("");
	};

	const handleChange = (e) => {
		onChange?.(e);
	};

	const handleDropDown = () => {
		inputRef.current.focus();
		setIsDropped((prev) => !prev);
	};

	const handleOptionClick = (i) => {
		setKeyword(filteredOptions[i].title);
	};
	return (
		<div className="input-field" onKeyDown={handleKeyDown}>
			<div
				className="input-container"
				style={{
					outline: isFocused ? "2px solid #1876D2" : "none",
					border: isFocused ? "none" : "1px solid gray",
				}}
			>
				<input
					ref={inputRef}
					onFocus={() => handleFocus(true)}
					onBlur={() => handleFocus(false)}
					value={keyword}
					onChange={handleChange}
				/>
				<div className="button-container">
					<button className="delete-btn" tabIndex={-1} onClick={handleClear}>
						x
					</button>
					<button className="toggle-btn" tabIndex={-1} onClick={handleDropDown}>
						v
					</button>
				</div>
			</div>
			{isDropped && (
				<div className="dropdown-container">
					<ul>
						{filteredOptions.map((option, i) => {
							return (
								<li
									onClick={handleOptionClick}
									style={{
										backgroundColor:
											i === selectIndex
												? "lightgrey"
												: "white",
									}}
									key={option.id}
								>
									{option.title}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}

export default InputField;
