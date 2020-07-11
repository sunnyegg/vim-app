import React, { useContext, useMemo } from 'react';
import CardList from './CardList';
import Loadingbar from '../layout/Loadingbar';
import { StatisticsContext } from '../../contexts/StatisticsContext';
import './List.style.scss';

const List = () => {
  const { statistics, loading } = useContext(StatisticsContext);

  const dataNiji = statistics.filter((data) => data.agency === 'nijisanji');
  const dataHolo = statistics.filter((data) => data.agency === 'hololive');
  const dataMaha = statistics.filter((data) => data.agency === 'mahapanca');
  const dataInd = statistics.filter((data) => data.agency === 'indie');

  const dataNijisanji = useMemo(() => dataNiji, [dataNiji]);
  const dataHololive = useMemo(() => dataHolo, [dataHolo]);
  const dataMahapanca = useMemo(() => dataMaha, [dataMaha]);
  const dataIndie = useMemo(() => dataInd, [dataInd]);

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
            <CardList columns={columns} data={dataIndie} />
          </div>
        </div>
      )}
    </>
  );
};

export default List;
