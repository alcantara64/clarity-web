import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { useStores } from '../../models';
import claimsIcon from '../../images/claims-icon.svg';
import alergyIcon from '../../images/alergy-icon.svg';
import proceduresIcon from '../../images/procedures-icon.svg';
import immunizationIcon from '../../images/immunisation-icon.svg';
import conditionsIcon from '../../images/conditions-icon.svg';
import medicationsIcon from '../../images/medications-icon.svg';
import prescriptionsIcon from '../../images/prescription-icon.svg';
import observationIcon from '../../images/observation-icon.svg';
import carePlanIcon from '../../images/careplan-icon.svg';
import diagnosticIcon from '../../images/diagnostic-icon.svg';
import documentIcon from '../../images/document-icon.svg';
import rollingSpinner from '../../images/rolling-spinner.svg';

import {
	CLAIMS_AND_CLINICAL_RESOURCE,
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
import { Dropdown, DropdownButton } from 'react-bootstrap';

const TimeLine = observer(() => {
	const { patientStore, payerStore, notificationStore } = useStores();
	const [selectValue, setSelectValue] = useState<string>('Carin BB');
	const { selectedResource } = patientStore;
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);
	const { notifications } = notificationStore;

	// const [currentResource, setCurrentResource] = useState(
	//   patientStore.selectedResource
	// );

	const [resourceData, setResourceData] = useState<{
		nextLink: string;
		entry: Array<any>;
		total?: number;
	} | null>(null);
	const [shouldRefreshToken, setShouldRefreshToken]: any = useState(false);
	const [hasRefreshToken, setHasRefreshToken]: any = useState(false);
	const defaultPayer = payerStore.defaultPayer();
	const history = useHistory();

	useEffect(() => {
		if (!defaultPayer?.is_connected) {
			history.push(ROUTES.oauth);
		}
	}, []);

	const getNextRecords = async () => {
		setIsLoading(true);
		setIsLoadingMoreData(true);
		const params = { next_link: resourceData?.nextLink || '', startIndex: '0' };

		const resp = await patientStore
			.getFhirData(selectedResource, defaultPayer?._id, params) //add a 3rd arg
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
					setHasRefreshToken(true);
				}
			}
			const resp = await patientStore
				.getFhirData(selectedResource, defaultPayer?._id, null)

				.catch(() => {});
			console.log(selectedResource);

			if (resp.kind === 'ok') {
				console.log(resp.data);
				setResourceData(resp.data);
			} else {
				setResourceData(null);
			}

			setIsLoading(false);
		})();
	}, [patientStore.selectedResource, shouldRefreshToken]);
	const getResourceImage = (resourceName: string) => {
		if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.allergy)
			return alergyIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.carePlan)
			return carePlanIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.claims)
			return claimsIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.condition)
			return conditionsIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.diagnosticReport)
			return diagnosticIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.documentReference)
			return documentIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.immunization)
			return immunizationIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.medication)
			return medicationsIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.observation)
			return observationIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.prescription)
			return prescriptionsIcon;
		else if (resourceName === CLAIMS_AND_CLINICAL_RESOURCE.procedure)
			return proceduresIcon;

		return '';
	};

	const ResourceItem = ({
		name,
		color,
		resourceName,
		selected,

		onClick = () => {},
	}: any) => {
		return (
			<div
				className='resource-item'
				style={{ backgroundColor: selected ? '#F5F6F8' : 'transparent' }}
				onClick={onClick}
			>
				<div
					className='resource-image-container'
					style={{ backgroundColor: color }}
				>
					<img src={getResourceImage(resourceName)} alt={name} />
				</div>
				<span className='resource-name'> {name}</span>
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
		if (resp?.kind == 'ok') {
			setShouldRefreshToken(false);
		} else {
			performOauth();
		}
		setIsLoading(false);
	};

	return (
		<div id='app-timeline'>
			<div className='app-timeline-dropdown' style={{ display: 'flex' }}>
				<h2 className='app-timeline-dropdown-title'> Capability Statement </h2>{' '}
				{/* <DropdownButton
					id="dropdown-basic-button"
					value={selectValue}
					onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
						setSelectValue(ev.target.value)
					}
					title={`${selectValue}`}
				>
					<Dropdown.Item value="Carin BB"> Carin BB</Dropdown.Item>
					<Dropdown.Item value="US Core"> US Core</Dropdown.Item>
				</DropdownButton> */}
				<select
					id='dropdown-basic-button'
					value={selectValue}
					onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
						setSelectValue(ev.target.value)
					}
					title={`${selectValue}`}
				>
					<option value='Carin BB'>Carin BB</option>
					<option value='US Core'>US Core</option>
				</select>
			</div>
			{isLoading && <Loading />}

			<div className='resource-container'>
				{selectValue === 'Carin BB'
					? TimelineResources.map((item) => (
							<div className='carinBB'>
								<ResourceItem
									key={item.name}
									resourceName={item.resource}
									name={item.name}
									color={item.color}
									selected={selectedResource == item.resource}
									onClick={() => {
										patientStore.setSelectedResource(item.resource);
									}}
								/>{' '}
							</div>
					  ))
					: selectValue === 'US Core'
					? TimelineResources.map((item) => (
							<div className='usCore'>
								<ResourceItem
									key={item.name}
									resourceName={item.resource}
									name={item.name}
									color={item.color}
									selected={selectedResource == item.resource}
									onClick={() => {
										patientStore.setSelectedResource(item.resource);
									}}
								/>
							</div>
					  ))
					: ''}
			</div>

			<div className='timeline-content'>
				<h5 className='timeline-title'>
					{getTimelineNameResource(selectedResource)}
				</h5>

				<TimelineList
					shouldRefreshToken={shouldRefreshToken}
					data={resourceData?.entry || []}
					itemClick={onTimelineClick}
					refreshToken={refreshToken}
				/>

				{resourceData?.nextLink && (
					<div className='pagination-container'>
						{!isLoadingMoreData ? (
							<Button
								onClick={() => {
									getNextRecords();
								}}
								className='pagination-btn next'
								label='load more'
							/>
						) : (
							<img src={rollingSpinner} alt='rolling spinner' />
						)}
					</div>
				)}
			</div>
		</div>
	);
});

export default TimeLine;
