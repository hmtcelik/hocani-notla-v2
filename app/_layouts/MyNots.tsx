import { Center, Loader, Skeleton, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import HocaCard from '../_components/hoca/HocaCard';
import { HocaType } from '../_models/Hoca';
import HocaService from '../_services/HocaService';
import initFirebase from '../_services/InitService';

type MyNotsProps = {
  hocaIds: string[];
};

const pageSize = 5;

const MyNots = ({ hocaIds }: MyNotsProps) => {
  initFirebase();

  const [data, setData] = useState<HocaType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);

    const hocaIdFiltered = hocaIds.slice(
      (newPage - 1) * pageSize,
      newPage * pageSize
    );

    HocaService.getHocas(hocaIdFiltered)
      .then((res) => {
        const newData = res.map((item) => {
          return {
            ...item,
            id: item.id,
          };
        });
        setData((prev) => [...prev, ...newData]);
        if ([...data, ...newData].length >= hocaIds.length) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setHasMore(false);
      });
  };

  useEffect(() => {
    nextPage();
  }, []);

  return (
    <InfiniteScroll
      dataLength={hocaIds.length}
      next={nextPage}
      hasMore={hasMore}
      loader={
        <Stack>
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} bg="#f1f3f5" h={200} w={'100%'} radius={20} />
          ))}
        </Stack>
      }
      endMessage={null}
    >
      <Stack mb={10}>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <HocaCard data={item} mode="edit" />
            </div>
          );
        })}
      </Stack>
    </InfiniteScroll>
  );
};

export default MyNots;
