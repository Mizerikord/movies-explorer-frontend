import React from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import { useForm } from "react-hook-form";

function SearchForm(props) {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: "onSubmit",
        defaultValues: {
            text: (props.parent === "movies"? localStorage.searchText : "")
        } 
    });

    function handleFormSubmit(data) {
        props.onSearch({
            text: data.text.toLowerCase(),
        });
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        handleFormSubmit(data);
    }
    
    return (
        <section className="search" aria-label="Поиск">
            <div className="search__area">
                <form name="search" className="search-box" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" className="search-elem" placeholder="Фильм"
                        {...register("text", {
                            required: "Нужно ввести ключевое слово"
                        })}
                    />
                    <button type="submit" className="search-sbmt btn-blackout" value='' />
                </form>
                <FilterCheckbox check={props.check} onCheck={props.onCheck} />
            </div>
            <div className="search__void">{errors?.text && <span className="elem-error">{errors?.text?.message || "Error!"}</span>}</div>
        </section>
    );
}

export default SearchForm;