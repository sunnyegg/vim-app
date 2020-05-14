import React, { useContext, useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Table from './Table';
import CardList from './CardList';
import Loadingbar from '../layout/Loadingbar';
import { ChannelContext } from '../../contexts/ChannelContext';
import { StatisticsContext } from '../../contexts/StatisticsContext';
import './List.style.scss';

dayjs.extend(localizedFormat);

const List = () => {
  const { channels, loading } = useContext(ChannelContext);
  const { statistics } = useContext(StatisticsContext);
  const [dataStatistics, setDataStatistics] = useState([]);

  const getStatistics = (data) => {
    const result = data.statistics.map((allData) => {
      let output;

      for (const channel of data.channels) {
        if (channel.id === allData['channel']) {
          const publishedAt = dayjs(channel.channel.channelPublishedAt).format(
            'LL'
          );

          output = {
            channelName: channel.channel.channelName,
            subscriber: parseInt(
              allData['statistics'].subscriberCount,
              0
            ).toLocaleString('id-ID'),
            publishDate: publishedAt,
            agency: channel.agency,
            channelIcon: channel.channel.channelIcon,
            id: channel.id,
          };
        }
      }

      return output;
    });

    if (result.length) {
      setDataStatistics(result.flat(1));
    }
  };

  useEffect(() => {
    getStatistics({ statistics, channels });
  }, [statistics, channels]);

  const dataNiji = dataStatistics.filter(
    (data) => data?.agency === 'nijisanji'
  );
  const dataHolo = dataStatistics.filter((data) => data?.agency === 'hololive');
  const dataMaha = dataStatistics.filter(
    (data) => data?.agency === 'mahapanca'
  );

  const dataNijisanji = useMemo(() => dataNiji, [dataNiji]);
  const dataHololive = useMemo(() => dataHolo, [dataHolo]);
  const dataMahapanca = useMemo(() => dataMaha, [dataMaha]);
  const columns = [
    {
      Header: ' ',
      accessor: (a) => (
        <img src={a.channelIcon} className="table-image" alt={a.channelName} />
      ),
    },
    {
      Header: 'Youtube Channel',
      accessor: 'channelName',
    },
    {
      Header: 'Subscribers',
      accessor: 'subscriber',
    },
    {
      Header: 'Channel Published Date',
      accessor: 'publishDate',
    },
    {
      Header: '  ',
      accessor: (a) => (
        <a
          href={`https://youtube.com/channel/${a.id}?sub_confirmation=1`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe
        </a>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <div>
          <Loadingbar />
          <div className="vim-container">Fetching Vtuber lists...</div>
        </div>
      ) : (
        <div className="vim-container list">
          <h1>Vtuber List</h1>
          <div className="agency-list">
            <h2 className="agency-name">Nijisanji</h2>
            <CardList columns={columns} data={dataNijisanji} />
          </div>
          <div className="agency-list">
            <h2 className="agency-name">Hololive</h2>
            <CardList columns={columns} data={dataHololive} />
          </div>
          <div className="agency-list">
            <h2 className="agency-name">Mahapanca</h2>
            <CardList columns={columns} data={dataMahapanca} />
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
