import React from "react";
import {DropDown, DropDownItem, SearchStyles} from "./styles/DropDown";
import {resetIdCounter, useCombobox} from "downshift";
import {gql} from "@apollo/client/core";
import {useLazyQuery} from "@apollo/client";
import debounce from 'lodash.debounce'
import {useRouter} from "next/router";

const SEARCH_PRODUCTS_QUERY = gql`
    query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
        searchTearms: allProducts(
            where: {OR: [
                {name_contains_i: $searchTerm},
                {description_contains_i: $searchTerm},
            ]}
        ) {
            id
            name
            price
            photo {
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`

const Search = props => {
    const router = useRouter()
    const [findItems, {error, loading, data}] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
        fetchPolicy: 'no-cache'
    })

    const items = data?.searchTearms || []

    const findItemsButChill = debounce(findItems, 450)

    resetIdCounter()

    const {inputValue, isOpen, getMenuProps, getInputProps, getComboboxProps, getItemProps, highlightedIndex} = useCombobox({
        items: items,
        onInputValueChange() {
            let rez = findItemsButChill({
                variables: {searchTerm: inputValue}
            })
        },
        onSelectedItemChange({selectedItem}) {
            router.push({
                pathname: `/product/${selectedItem.id}`
            })
        },
        itemToString: item => item?.name || ''
    })

    return (
        <SearchStyles>
            <div {...getComboboxProps()}>
                <input {...getInputProps({
                    type       : "search",
                    placeholder: "Search for an item",
                    id         : "search",
                    className  : loading ? "loading" : ''
                })} />
            </div>
            <DropDown {...getMenuProps()}>
                {isOpen && items.map((item, index) => <DropDownItem
                    key={item.id}
                    {...getItemProps({ key: item.id, index, item })}
                    highlighted={index === highlightedIndex}
                >
                    <img src={item.photo.image.publicUrlTransformed} alt={item.name} width={50}/>

                    {item.name}
                </DropDownItem> )}
                {isOpen && !items.length && !loading && (
                    <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
                )}
            </DropDown>
        </SearchStyles>
    )
}

export default Search