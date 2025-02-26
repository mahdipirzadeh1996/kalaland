import React, { useEffect, useState } from 'react';
import { Add } from 'iconsax-react';

import './plans.scss';
import AddPlan from '../../component/addPlan/AddPlan';
import CardPlan from '../../component/cardPlan/CardPlan';
import EditPlan from '../../component/editPlan/EditPlan';

const Plans = ({ setTitle, setCurrent }) => {
  const [planStatus, setPlanStatus] = useState({
    'planList': true,
    'addPlan': false,
    'editPlan': false,
  });
  const [item, setItem] = useState(null);

  useEffect(() => {
    setTitle('Plan');
    setCurrent('/plans');
  }, []);

  return (
    <div className='plans'>
      {planStatus.planList &&
        <>
          <CardPlan item={item} setItem={setItem} planStatus={planStatus} setPlanStatus={setPlanStatus} />

          <button className='floatBtn' onClick={() => {
            setPlanStatus({
              ...planStatus,
              'addPlan': true,
              'planList': false,
            });
          }}>
            <Add
              size="32"
              color='#fff'
            />
          </button>
        </>
      }

      {planStatus.addPlan &&
        <AddPlan planStatus={planStatus} setPlanStatus={setPlanStatus} />
      }

      {planStatus.editPlan &&
        <EditPlan item={item} setItem={setItem} planStatus={planStatus} setPlanStatus={setPlanStatus} />
      }
    </div>
  );
};

export default Plans;