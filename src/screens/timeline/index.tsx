import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { useStores } from '../../models';
import rollingSpinner from '../../images/rolling-spinner.svg';

import {
  CLAIMS_CATEGORY,
  CLINICAL_CATEGORY,
  FORMULARY_NET,
  IMPLEMENTATION_GUIDE,
  SECURE_US_DRUG,
  TimelineResources,
} from '../../constants/constants';

import './index.less';
import TimelineList from '../../components/TimelineList';
import { useHistory } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { getTimelineNameResource } from '../../factories/utils';
import { observer } from 'mobx-react-lite';
import Button from '../../components/Button';
import NotificationService from '../../services/NotificationService';
import { CapabilityStatement } from '../../typesDefinitions/CapabilityStatement';
import Select from '../../components/Select';
import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import { getResourceImage } from '../../util/Timeline.util';
//import styled from 'styled-components';
const capability_statement: Array<CapabilityStatement> = [
  {
    name: 'Carin Blue Button',
    endpoint: 'carin-bb',
    value: 'carin-bb',
    category: CLAIMS_CATEGORY,
    identifier: 'carinBB',
  },
  {
    name: 'PDEX Server',
    endpoint: 'uscore',
    value: 'uscore',
    category: CLINICAL_CATEGORY,
    identifier: 'pdex',
  },
  {
    name: 'Carin Blue Button Pharmacy',
    endpoint: 'carin-bb-pharmacy',
    value: 'carin-bb-pharmacy',
    category: CLAIMS_CATEGORY,
    identifier: 'carinBBPharmacy',
  },
  {
    name: 'US Core Server Pharmacy',
    endpoint: 'uscore-pharmacy',
    value: 'uscore-pharmacy',
    category: CLINICAL_CATEGORY,
    identifier: 'uscorePharmacy',
  },
  {
    name: 'Secure US Drug Formulary Server',
    endpoint: 'secure-formulary',
    value: 'secure-formulary',
    category: SECURE_US_DRUG,
    identifier: 'secureFormulary',
  },
  {
    name: 'Formulary Network',
    endpoint: 'formulary-net',
    value: 'formulary-net',
    category: FORMULARY_NET,
    identifier: 'formularyNet',
  },
  {
    name: 'Plan-Net',
    endpoint: 'provider-directory',
    value: 'provider-directory',
    category: FORMULARY_NET,
    identifier: 'planNet',
  },
];

const TimeLine = observer(() => {
  const { patientStore, payerStore, notificationStore, settingStore } =
    useStores();
  const [capabilityStatements, setCapabilityStatements] = useState<
    CapabilityStatement[]
  >([]);
  const [selectedCapabilityStatement, setSelectedCapabilityStatement] =
    useState<CapabilityStatement>(capabilityStatements[0]);
  const { selectedResource } = patientStore;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);
  const { notifications } = notificationStore;
  const { implementationGuid, fetSettings } = settingStore;

  const [resourceData, setResourceData] = useState<{
    nextLink: string;
    entry: Array<any>;
    total?: number;
  } | null>(null);
  const [shouldRefreshToken, setShouldRefreshToken]: any = useState(false);
  const defaultPayer = payerStore.defaultPayer();
  const history = useHistory();
  let filteredCapabilityStatement: Array<CapabilityStatement> =
    capability_statement;

  useEffect(() => {
    if (!defaultPayer?.is_connected) {
      history.push(ROUTES.oauth);
    }
  }, [defaultPayer?.is_connected, history]);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await fetSettings().catch((err) => {
        console.log(err);
      });
      if (
        result?.kind === 'ok' &&
        result?.data &&
        result?.data.find((item: any) => item.type === IMPLEMENTATION_GUIDE)
      ) {
        filteredCapabilityStatement = [];
        const ig = result?.data.find(
          (item: any) => item.type === IMPLEMENTATION_GUIDE
        );
        const parsedValue = JSON.parse(ig.value);
        for (const item of capability_statement) {
          if (parsedValue[item.identifier]) {
            filteredCapabilityStatement.push(item);
          }
        }
      }
      debugger;
      setCapabilityStatements(filteredCapabilityStatement);
      setSelectedCapabilityStatement(filteredCapabilityStatement[0]);
      setIsLoading(false);
    })();
  }, []);

  const getNextRecords = async () => {
    setIsLoading(true);
    setIsLoadingMoreData(true);
    const params = {
      next_link: resourceData?.nextLink || '',
      startIndex: '0',
      resourceEndpoint: selectedCapabilityStatement.endpoint,
    };

    const resp = await patientStore
      .getFhirData(selectedResource, defaultPayer?._id, params)
      .catch(() => {});

    if (resp.kind === 'ok') {
      if (resourceData?.entry) {
        resp.data.entry = [...resourceData?.entry, ...resp.data.entry];
      }
      setResourceData(resp.data);
    } else {
      NotificationService.show(
        'We could not fetch data for the next page, you are still viewing the first set of data',
        'warning'
      );
    }
    setIsLoadingMoreData(false);
    setIsLoading(false);
  };
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await notificationStore.getNotifications().catch((error) => {
        console.log('notification error', error);
      });
      const defaultPayer = payerStore.defaultPayer();
      const payerNotification = notifications.find(
        (x) => x.name === defaultPayer?.name
      );
      if (payerNotification) {
        setShouldRefreshToken(true);
        if (payerNotification.hasRefreshToken) {
          //setHasRefreshToken(true);
        }
      }

      const resp = await patientStore
        .getFhirData(selectedResource, defaultPayer?._id, {
          resourceEndpoint: selectedCapabilityStatement?.value,
          next_link: '',
        })
        .catch(() => {});

      if (resp.kind === 'ok') {
        console.log(resp.data);
        setResourceData(resp.data);
      } else {
        setResourceData(null);
      }

      setIsLoading(false);
    })();
  }, [
    patientStore.selectedResource,
    shouldRefreshToken,
    selectedCapabilityStatement,
  ]);

  const ResourceItem = ({
    name,
    color,
    resourceName,
    selected,
    disable,
    onClick = () => {},
  }: any) => {
    const resourceItemClass = classNames('resource-item', {
      disableResource: disable,
    });
    return (
      <div
        className={resourceItemClass}
        style={{ backgroundColor: selected ? '#F5F6F8' : 'transparent' }}
        onClick={onClick}
      >
        <div
          className="resource-image-container"
          style={{ backgroundColor: color }}
        >
          <img src={getResourceImage(resourceName)} alt={name} />
        </div>
        <span className="resource-name"> {name}</span>
      </div>
    );
  };

  const onTimelineClick = (item: any) => {
    history.push(ROUTES.timeLineDetails, {
      timelineData: item,
    });
  };
  const performOauth = () => {
    if (!defaultPayer) return;

    window.open(defaultPayer?.oauth_url, '_self', 'width=500,height=500');

    setIsLoading(true);
  };
  const refreshToken = async () => {
    setIsLoading(true);
    const defaultPayer = payerStore.defaultPayer();
    const resp = await payerStore.refreshUserToken(defaultPayer?._id);
    if (resp?.kind === 'ok') {
      setShouldRefreshToken(false);
    } else {
      performOauth();
    }
    setIsLoading(false);
  };

  const handleSelectedEndpoint = (e: string) => {
    const capStatement = capability_statement.find((item) => item.value === e);
    if (capStatement) {
      setSelectedCapabilityStatement(capStatement);
    }
  };

  return (
    <div id="app-timeline">
      {isLoading && <Loading />}
      <Row>
        <Col md={6} sm={12}>
          <Select
            onChange={handleSelectedEndpoint}
            items={capabilityStatements}
          />
        </Col>
      </Row>

      <div className="resource-container">
        {TimelineResources?.map((item) => (
          <ResourceItem
            key={item.name}
            resourceName={item.resource}
            name={item.name}
            color={item.color}
            selected={selectedResource === item.resource}
            disable={
              !selectedCapabilityStatement?.category?.includes(item.resource)
            }
            onClick={() => {
              patientStore.setSelectedResource(item.resource);
            }}
          />
        ))}
      </div>

      <div className="timeline-content">
        <h5 className="timeline-title">
          {getTimelineNameResource(selectedResource)}
        </h5>

        <TimelineList
          shouldRefreshToken={shouldRefreshToken}
          data={resourceData?.entry || []}
          itemClick={onTimelineClick}
          refreshToken={refreshToken}
        />
        {resourceData?.nextLink && (
          <div className="pagination-container">
            {!isLoadingMoreData ? (
              <Button
                onClick={() => {
                  getNextRecords();
                }}
                className="pagination-btn next"
                label="load more"
              />
            ) : (
              <img src={rollingSpinner} alt="rolling spinner" />
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default TimeLine;
