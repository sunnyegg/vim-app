import React, { useContext, useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Table from './Table';
import Loadingbar from '../layout/Loadingbar';
import { ChannelContext } from '../../contexts/ChannelContext';
import { StatisticsContext } from '../../contexts/StatisticsContext';
import './List.style.scss';

dayjs.extend(localizedFormat);

const List = () => {
  const { channels } = useContext(ChannelContext);
  const { statistics } = useContext(StatisticsContext);
  const [dataStatistics, setDataStatistics] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatistics = (data) => {
    const result = data.statistics.map((allData) => {
      let output;
      const latest = allData[allData.length - 1];
      for (const channel of data.channels) {
        if (channel.id === latest['channel']) {
          const publishedAt = dayjs(channel.channel.channelPublishedAt).format(
            'LL'
          );
          const updatedAt = dayjs(JSON.parse(latest['date'])).format('LL');
          output = {
            channelName: channel.channel.channelName,
            subscriber: latest['statistics'].subscriberCount,
            publishDate: publishedAt,
            update: updatedAt,
            agency: channel.agency,
          };
        }
      }
      return output;
    });

    if (result.length) {
      setDataStatistics(result.flat(1));
      setLoading((loading) => !loading);
    }
  };

  useEffect(() => {
    getStatistics({ statistics, channels });
  }, [statistics, channels]);

  const dataNiji = dataStatistics.filter((data) => data.agency === 'nijisanji');
  const dataHolo = dataStatistics.filter((data) => data.agency === 'hololive');

  const dataNijisanji = useMemo(() => dataNiji, [dataNiji]);
  const dataHololive = useMemo(() => dataHolo, [dataHolo]);
  const columns = useMemo(
    () => [
      {
        Header: 'Youtube Channel',
        accessor: 'channelName',
      },
      {
        Header: 'Subscribers',
        accessor: 'subscriber',
      },
      {
        Header: 'Debuted At',
        accessor: 'publishDate',
      },
      {
        Header: 'Updated At',
        accessor: 'update',
      },
    ],
    []
  );

  return (
    <>
      {loading ? (
        <div>
          <Loadingbar />
          <div className="container list">Fetching Vtuber lists...</div>
        </div>
      ) : (
        <div className="container">
          <h1>Vtuber List</h1>
          <div className="agency-list">
            <h2 className="agency-name">Nijisanji</h2>
            <Table columns={columns} data={dataNijisanji} />
          </div>
          <div className="agency-list">
            <h2 className="agency-name">Hololive</h2>
            <Table columns={columns} data={dataHololive} />
          </div>
          <div className="agency-list">
            <h2 className="agency-name">Indie</h2>
            <p>Coming soon...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
