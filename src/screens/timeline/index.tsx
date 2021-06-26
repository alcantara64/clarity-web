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
import encounterIcon from '../../images/encounter-icon.svg';
import insuranceIcon from '../../images/insurance-icon.svg';
import healthcareIcon from '../../images/healthcare-icon.svg';
import organizationIcon from '../../images/organization-icon.svg';
import practicionerIcon from '../../images/practicioner-icon.svg';
import affiliationIcon from '../../images/affiliation-icon.svg';
import locationIcon from '../../images/location-icon.svg';
import roleIcon from '../../images/role-icon.svg';
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
import { CapabilityStatement } from '../../typesDefinitions/CapabilityStatement';
import Select from '../../components/Select';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
const capability_statement: Array<CapabilityStatement> = [
	{
		name: 'Carin Blue Button',
		endpoint: 'carin-bb',
		value: 'carin',
	},
	{
		name: 'PDEX Server',
		endpoint: 'uscore',
		value: 'uscore',
	},
	{
		name: 'Carin Blue Button Pharmacy',
		endpoint: 'carin-bb-pharmacy',
		value: 'carin',
	},
	{
		name: 'US Core Server Pharmacy',
		endpoint: 'uscore-pharmacy',
		value: 'uscore',
	},
	{
		name: 'Secure US Drug Formulary Server',
		endpoint: 'secure-formulary',
		value: 'formulary',
	},
	{
		name: 'Formulary Network',
		endpoint: 'formulary-net',
		value: 'formulary-net',
	},
	{
		name: 'Plan-Net',
		endpoint: 'provider-directory',
		value: 'provider',
	},
];

const TimeLine = observer(() => {
	const { patientStore, payerStore, notificationStore } = useStores();
	const [selected, setSelected] = useState('carin');
	const [viewState, setViewState] = useState(TimelineResources);

	const totalLengthForCarinStatement =
		viewState.filter((category) => category.category === 'a').length + 1;
	const totalLengthForUScoreStatement =
		viewState.filter((category) => category.category === 'b').length + 1;
	const totalLengthForFormularyNetworkStatement =
		viewState.filter((category) => category.category === 'c').length + 1;

	const { selectedResource } = patientStore;

	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);
	const { notifications } = notificationStore;

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
					setHasRefreshToken(true);
				}
			}
			const resp = await patientStore
				.getFhirData(selectedResource, defaultPayer?._id, null)
				.catch(() => {});

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
		switch (resourceName) {
			case CLAIMS_AND_CLINICAL_RESOURCE.allergy:
				return alergyIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.carePlan:
				return carePlanIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.claims:
				return claimsIcon;
				break;

			case CLAIMS_AND_CLINICAL_RESOURCE.condition:
				return conditionsIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.diagnosticReport:
				return diagnosticIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.documentReference:
				return documentIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.immunization:
				return immunizationIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.medication:
				return medicationsIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.observation:
				return observationIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.prescription:
				return prescriptionsIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.procedure:
				return proceduresIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.encounter:
				return encounterIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.insurance:
				return insuranceIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.healthcare:
				return healthcareIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.organization:
				return organizationIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.practicioner:
				return practicionerIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.role:
				return roleIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.location:
				return locationIcon;
				break;
			case CLAIMS_AND_CLINICAL_RESOURCE.affiliation:
				return affiliationIcon;
				break;

			default:
				break;
		}
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

	const handleSelected = (e: string) => setSelected(e);

	const OpacityDivA = styled.div`
		:nth-child(n + ${totalLengthForCarinStatement}) {
			opacity: 0.4;
		}
	`;
	const OpacityDivB = styled.div`
		:nth-child(n + ${totalLengthForUScoreStatement}) {
			opacity: 0.4;
		}
	`;

	const OpacityDivC = styled.div`
		:nth-child(n + ${totalLengthForFormularyNetworkStatement}) {
			opacity: 0.4;
		}
	`;

	return (
		<div id='app-timeline'>
			{isLoading && <Loading />}
			<Row>
				<Col md={6} sm={12}>
					<Select onChange={handleSelected} items={capability_statement} />
				</Col>
			</Row>

			<div className='resource-container'>
				{selected === 'carin'
					? TimelineResources?.sort((a, b) =>
							a.category === 'a' ? -1 : 1
					  ).map((item) => (
							<OpacityDivA>
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
							</OpacityDivA>
					  ))
					: selected === 'uscore'
					? TimelineResources.sort((a, b) => (a.category === 'b' ? -1 : 1)).map(
							(item) => (
								<OpacityDivB>
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
								</OpacityDivB>
							)
					  )
					: selected === 'formulary-net'
					? TimelineResources.sort((a, b) => (a.category === 'c' ? -1 : 1)).map(
							(item) => (
								<OpacityDivC>
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
								</OpacityDivC>
							)
					  )
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
