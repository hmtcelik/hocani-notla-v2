'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, CloseButton, Combobox, Loader, TextInput, useCombobox } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';
import useHocaSearch from '@/app/_hooks/useHocaSearch';
import HocaService from '@/app/_services/HocaService';
import { useDebouncedState } from '@mantine/hooks';
import { HocaType } from '@/app/_models/Hoca';

type ResponsiveProps = {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  base?: string;
};

interface HocaSearchProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  inputHeight?: number;
  maxW?: number;
  borderColor?: string;
  display?: string | ResponsiveProps;
}

const HocaSearch = ({
  size,
  inputHeight,
  maxW,
  borderColor,
  display,
}: HocaSearchProps) => {
  const combobox = useCombobox();
  const router = useRouter();
  const searchHoca = useHocaSearch();

  const searchParams = useSearchParams();
  const searchValue = searchParams.get('value');

  const [search, setSearch] = useDebouncedState(searchValue || '', 600);
  const [searchData, setSearchData] = useState<HocaType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const findHoca = async () => {
      setIsLoading(true)
      if (search) {
        const data = await searchHoca(search);
        
        if (data && data?.length>0){
          const hocaResults = await HocaService.getHocas(
              data?.slice(0, 5).map((item) => item.toString())
          )
          setSearchData(hocaResults); 
          combobox.openDropdown();
        }
      }
      setIsLoading(false)
    };
    findHoca();
  }, [search]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (search.trim() === '') return;
    setIsLoading(true)
    router.push(`/search?value=${search}`);
    setIsLoading(false)
  };

  const handleComboboxSubmit = (e:string) => {
    setIsLoading(true)
    router.push(`/hoca/${e}`);
    setIsLoading(false)
  }

  return (
    <Box
      display={display}
      style={{
        width: '100%',
        maxWidth: maxW || 650,
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Combobox store={combobox} onOptionSubmit={(val)=>{handleComboboxSubmit(val);combobox.closeDropdown();}}>
        <Combobox.Target>
        <TextInput
          size={size || 'lg'}
          radius="xl"
          defaultValue={search}
          placeholder="Örn: Can Alkan"
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setSearchData([]);
            combobox.closeDropdown()
          }}
          onBlur={() => {
            combobox.closeDropdown();
          }}
          leftSection={
            isLoading ? 
              <Loader size='sm' color='black' />
             :
            <IconSchool color="black" />
        }
          rightSection={
            <CloseButton
              color="black"
              aria-label="Clear input"
              onClick={() => {
                setSearch('');
                setSearchData([]);
              }}
              style={{ display: search ? undefined : 'none' }}
            />
          }
          styles={{
            section: {
              marginLeft: 7,
              marginRight: 7,
            },
            input: {
              paddingLeft: 60,
              height: `${inputHeight || '60'}`,
              border: `solid 2px ${borderColor || 'black'}`,
            },
          }}
        />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {searchData.map((item) => (
              <Combobox.Option value={item.id} key={item.id}>
                {item.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>

        </Combobox>

      </form>
    </Box>
  );
};

export default HocaSearch;
