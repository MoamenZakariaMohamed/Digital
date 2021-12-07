import React,{useState,useEffect} from 'react'
import { Card, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import millify from 'millify';
import Loading from './Loading';


export const Cryptocurrencies = ({simplified}) => {
    const count=simplified?10:100;
    const { data:cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));
        
        setCryptos(filteredData)
    }, [cryptosList,searchTerm])

    if (isFetching) return <Loading />
    return (
        <>  {!simplified&&
                ( <div className="search-crypto">
                        <Input placeholder='Search Cryptocurrency ' onChange={(e)=>setSearchTerm(e.target.value)} />
                  </div>
                )}
             
           <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency)=>(
                    <Col xs={24} lg={6} sm={12} className='crypto-card' key={currency.id}>
                         <Link key={currency.id} to={`/crypto/${currency.id}`}>
                         <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} />} hoverable>
                                <p>Price:{millify(currency.price)}</p>
                                <p>Market Cap:{millify(currency.marketCap)}</p>
                                <p>Daily Change:{millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};
