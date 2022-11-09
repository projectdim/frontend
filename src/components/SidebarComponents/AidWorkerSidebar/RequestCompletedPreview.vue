<template>

	<ConfirmModal :is-bg-click-close=false :is-visible="isLeaveModalVisible"
								cancel-button-text="Повернутись" accept-button-text="Покинути сторінку"
								title="Дані не збережено" :question="question"
								:close-func="closeLeavePageConfirmModal"
								:accept-button-func="ModalAccept"
								:cancel-button-func="ModalCancel"/>


	<AwaitModal :isVisible="isPushingMessageVisible" :closeFunc="closePushingModal"
							message="Публікування..."/>

	<SuccessMessage :isVisible="isResultMessageVisible" :closeFunc="closeResultModal"
	:closeTimeout="3000" message="Дані успішно опубліковані!"/>

	<div class="overflow-y-auto h-full relative">
		<div class="bg-blue-c-500 flex flex-wrap gap-2 justify-between p-6 sticky top-0 right-0 left-0">
			<p class="text-white text-h3 font-semibold align-middle grid content-center">
				Зробіть цю інформацію публічною
			</p>
			<Button2 class="flex flex-nowrap items-center gap-1"
				@click="SaveAndPublish">
				<img src="/public/completed.svg" class="inline-block">
				<p>
					Опублікувати
				</p>
			</Button2>
		</div>

		<div id="RequestPreview" class="px-6 mobile:px-4 ">
			<h1 class="font-semibold my-6 text-h1
			mobile:text-h1-m
			tablet:text-h1-m">
				{{ this.requestedMarker.address }},
				{{ this.requestedMarker.index }},
				{{ this.requestedMarker.city }}
			</h1>

			<h3 class="font-semibold text-h2
			mobile:text-h2-m">
				Загальний стан
			</h3>
			<!--	#region  Build status-->
			<div class="mobile:text-h4 text-h3 mt-2" >

				<div class="py-4 shadow-cs2">
					<div class="flex flex-nowrap">
						<svg :class="getSVGColorClass('buildingCondition', markerReports.buildingCondition.flag)"
								 class="mr-1.5 my-auto w-6" width="22" height="20" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0.654663L21.669 10.2567C22.0795 10.6262 22.1128 11.2585 21.7433 11.669C21.3738 12.0795 20.7416 12.1128 20.331 11.7433L19 10.5454V21H3.00001V10.5454L1.66897 11.7433C1.25846 12.1128 0.626173 12.0795 0.256714 11.669C-0.112745 11.2585 -0.079466 10.6262 0.331044 10.2567L11 0.654663ZM5.00001 8.74539V19H17V8.74538L11 3.34539L5.00001 8.74539Z"/>
						</svg>
						<p class="grow font-semibold my-auto uppercase"
							 :class="getTextColorClass('buildingCondition', markerReports.buildingCondition.flag)">
							{{markerReports.buildingCondition.flag}}
						</p>
						<p class="text-gray-c-500 my-auto font-normal px-1">
							{{(new Date()).toLocaleString()}}
						</p>
					</div>
					<div class="min-h-min bg-gray-c-200 text-gray-c-500 p-2 rounded-sm mt-2"
							 v-if="markerReports.buildingCondition.description">
						<span>
							{{ markerReports.buildingCondition.description }}
						</span>
					</div>
				</div>

				<div class="py-4 shadow-cs2">
					<div class="flex flex-nowrap">
						<svg :class="getSVGColorClass('electricity', markerReports.electricity.flag)"
								 width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg"
								 class="mr-1.5 my-auto w-6" >
							<mask id="path-1-outside-1_196_685" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="22" fill="black">
								<rect fill="white" width="14" height="22"/>
								<path d="M6.5 12.8H5.12986C3.72143 12.8 3.01721 12.8 2.72228 12.3385C2.42735 11.8769 2.72321 11.2379 3.31493 9.95975L6.04627 4.06006C6.42045 3.25182 6.60755 2.8477 6.80377 2.89091C7 2.93413 7 3.37946 7 4.27013V8.7C7 8.9357 7 9.05355 7.07322 9.12678C7.14645 9.2 7.2643 9.2 7.5 9.2H8.87014C10.2786 9.2 10.9828 9.2 11.2777 9.66154C11.5726 10.1231 11.2768 10.7621 10.6851 12.0402L7.95373 17.9399C7.57955 18.7482 7.39245 19.1523 7.19623 19.1091C7 19.0659 7 18.6205 7 17.7299V13.3C7 13.0643 7 12.9464 6.92678 12.8732C6.85355 12.8 6.7357 12.8 6.5 12.8Z"/>
							</mask>
							<path d="M7.95373 17.9399L6.1388 17.0997L6.1388 17.0997L7.95373 17.9399ZM10.6851 12.0402L12.5 12.8805V12.8805L10.6851 12.0402ZM6.04627 4.06006L4.23133 3.21982V3.21982L6.04627 4.06006ZM3.31493 9.95975L1.5 9.1195H1.5L3.31493 9.95975ZM6.80377 2.89091L7.23397 0.937729L7.23397 0.937729L6.80377 2.89091ZM7.07322 9.12678L5.659 10.541L5.65901 10.541L7.07322 9.12678ZM11.2777 9.66154L12.963 8.58462L12.963 8.58462L11.2777 9.66154ZM7.19623 19.1091L6.76604 21.0623H6.76604L7.19623 19.1091ZM6.92678 12.8732L8.34099 11.459L8.34099 11.459L6.92678 12.8732ZM2.72228 12.3385L4.40758 11.2615L4.40758 11.2615L2.72228 12.3385ZM5.12986 14.8H6.5V10.8H5.12986V14.8ZM5 13.3V17.7299H9V13.3H5ZM9.76867 18.7802L12.5 12.8805L8.87014 11.2L6.1388 17.0997L9.76867 18.7802ZM8.87014 7.2H7.5V11.2H8.87014V7.2ZM4.23133 3.21982L1.5 9.1195L5.12986 10.8L7.8612 4.90031L4.23133 3.21982ZM9 8.7V4.27013H5V8.7H9ZM7.8612 4.90031C7.95713 4.69311 8.0306 4.53458 8.09416 4.40362C8.15997 4.26803 8.19383 4.20669 8.20644 4.18569C8.23576 4.13685 8.15981 4.28338 7.9694 4.44935C7.86138 4.54351 7.66677 4.6882 7.38227 4.78632C7.07531 4.89218 6.72536 4.92158 6.37358 4.8441L7.23397 0.937729C6.34623 0.742204 5.67059 1.14685 5.3411 1.43405C5.04873 1.6889 4.86583 1.97887 4.77708 2.12669C4.58969 2.43879 4.39584 2.86449 4.23133 3.21982L7.8612 4.90031ZM9 4.27013C9 3.87856 9.00293 3.41081 8.964 3.04887C8.94557 2.87745 8.90141 2.53746 8.74316 2.18336C8.56482 1.78431 8.1217 1.13326 7.23397 0.937729L6.37358 4.8441C6.0218 4.76662 5.71659 4.59292 5.4825 4.36789C5.26555 4.15933 5.14974 3.94626 5.09127 3.81544C4.98821 3.58483 4.98085 3.41995 4.98694 3.47659C4.98956 3.50094 4.99451 3.57084 4.99727 3.72152C4.99993 3.86707 5 4.04179 5 4.27013H9ZM7.5 7.2C7.43364 7.2 7.40955 7.19987 7.39463 7.19949C7.3787 7.19909 7.4219 7.19923 7.49218 7.20868C7.64587 7.22935 8.09051 7.31564 8.48743 7.71256L5.65901 10.541C6.12916 11.0111 6.66933 11.134 6.95919 11.173C7.19151 11.2042 7.43869 11.2 7.5 11.2V7.2ZM5 8.7C5 8.76131 4.99575 9.00849 5.02699 9.24081C5.06596 9.53067 5.18886 10.0708 5.659 10.541L8.48744 7.71257C8.88436 8.10949 8.97065 8.55413 8.99132 8.70782C9.00077 8.7781 9.00091 8.8213 9.00051 8.80537C9.00013 8.79045 9 8.76636 9 8.7H5ZM12.5 12.8805C12.7679 12.3018 13.0695 11.6629 13.2325 11.1096C13.405 10.5234 13.5746 9.54166 12.963 8.58462L9.59242 10.7385C9.45435 10.5224 9.39934 10.2916 9.39371 10.1102C9.38917 9.96385 9.41846 9.90121 9.39532 9.9798C9.37334 10.0544 9.32667 10.1831 9.23195 10.403C9.13843 10.6201 9.02146 10.8732 8.87014 11.2L12.5 12.8805ZM8.87014 11.2C9.23031 11.2 9.50907 11.2001 9.74537 11.2065C9.98471 11.2129 10.1211 11.2246 10.1981 11.2361C10.2791 11.2481 10.21 11.2483 10.0791 11.1827C9.91682 11.1014 9.73048 10.9545 9.59242 10.7385L12.963 8.58462C12.3515 7.62758 11.3893 7.36898 10.7849 7.27933C10.2143 7.19471 9.50782 7.2 8.87014 7.2V11.2ZM5 17.7299C5 18.1214 4.99707 18.5892 5.036 18.9511C5.05443 19.1226 5.09859 19.4625 5.25684 19.8166C5.43518 20.2157 5.8783 20.8667 6.76604 21.0623L7.62641 17.1559C7.9782 17.2334 8.28341 17.4071 8.5175 17.6321C8.73445 17.8407 8.85026 18.0537 8.90873 18.1846C9.01179 18.4152 9.01915 18.5801 9.01306 18.5234C9.01044 18.4991 9.00549 18.4292 9.00273 18.2785C9.00007 18.1329 9 17.9582 9 17.7299H5ZM6.1388 17.0997C6.04287 17.3069 5.9694 17.4654 5.90584 17.5964C5.84003 17.732 5.80617 17.7933 5.79357 17.8143C5.76424 17.8632 5.84019 17.7166 6.0306 17.5506C6.13862 17.4565 6.33323 17.3118 6.61772 17.2137C6.92469 17.1078 7.27463 17.0784 7.62641 17.1559L6.76604 21.0623C7.65377 21.2578 8.3294 20.8532 8.6589 20.566C8.95127 20.3111 9.13417 20.0211 9.22292 19.8733C9.41031 19.5612 9.60416 19.1355 9.76867 18.7802L6.1388 17.0997ZM6.5 14.8C6.56636 14.8 6.59045 14.8001 6.60537 14.8005C6.6213 14.8009 6.5781 14.8008 6.50782 14.7913C6.35413 14.7707 5.90949 14.6844 5.51257 14.2874L8.34099 11.459C7.87084 10.9889 7.33067 10.866 7.04081 10.827C6.80849 10.7958 6.56131 10.8 6.5 10.8V14.8ZM9 13.3C9 13.2387 9.00425 12.9915 8.97301 12.7592C8.93404 12.4693 8.81114 11.9292 8.34099 11.459L5.51256 14.2874C5.11564 13.8905 5.02935 13.4459 5.00868 13.2922C4.99923 13.2219 4.99909 13.1787 4.99949 13.1946C4.99987 13.2096 5 13.2336 5 13.3H9ZM5.12986 10.8C4.76969 10.8 4.49093 10.7998 4.25463 10.7935C4.01529 10.7871 3.8789 10.7754 3.80193 10.7639C3.7209 10.7519 3.79004 10.7517 3.92095 10.8173C4.08319 10.8986 4.26952 11.0455 4.40758 11.2615L1.03698 13.4154C1.64853 14.3724 2.61066 14.631 3.21508 14.7207C3.78566 14.8053 4.49218 14.8 5.12986 14.8V10.8ZM1.5 9.1195C1.23209 9.69818 0.930461 10.3371 0.767543 10.8904C0.594966 11.4766 0.425422 12.4583 1.03698 13.4154L4.40758 11.2615C4.54565 11.4776 4.60066 11.7084 4.60629 11.8898C4.61083 12.0362 4.58154 12.0988 4.60468 12.0202C4.62666 11.9456 4.67333 11.8169 4.76805 11.597C4.86157 11.3799 4.97855 11.1268 5.12986 10.8L1.5 9.1195Z" mask="url(#path-1-outside-1_196_685)"/>
						</svg>
						<p class="grow font-semibold my-auto uppercase"
							 :class=" getTextColorClass('electricity', markerReports.electricity.flag)">
							{{markerReports.electricity.flag}}
						</p>
						<p class="text-gray-c-500 my-auto font-normal px-1">
							{{(new Date()).toLocaleString()}}
						</p>
					</div>
					<div class="min-h-min bg-gray-c-200 text-gray-c-500 p-2 rounded-sm mt-2" v-if="markerReports.electricity.description">
						<span>
							{{ markerReports.electricity.description }}
						</span>
					</div>
				</div>

				<div class="py-4 shadow-cs2">
					<div class="flex flex-nowrap ">
						<svg :class="getSVGColorClass('carEntrance', markerReports.carEntrance.flag)"
								 class="mr-1.5 my-auto w-6" width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M2.87043 18L8.77812 2H11V3H13V2L15.2219 2L21.1296 18H2.87043ZM7.14327 0.653627C7.2883 0.260846 7.66267 0 8.08137 0H15.9186C16.3373 0 16.7117 0.260845 16.8567 0.653626L23.5029 18.6536C23.744 19.3066 23.2608 20 22.5648 20H1.43521C0.739157 20 0.25602 19.3066 0.497115 18.6536L7.14327 0.653627ZM11 8V5H13V8H11ZM11 10V14H13V10H11Z"/>
						</svg>
						<p class="grow font-semibold my-auto uppercase"
							 :class="getTextColorClass('carEntrance', markerReports.carEntrance.flag)">
							{{markerReports.carEntrance.flag}}
						</p>
						<p class="text-gray-c-500 my-auto font-normal px-1">
							{{(new Date()).toLocaleString()}}
						</p>
					</div>
					<div class="min-h-min bg-gray-c-200 text-gray-c-500 p-2 rounded-sm mt-2" v-if="markerReports.carEntrance.description">
						<span>
							{{ markerReports.carEntrance.description }}
						</span>
					</div>
				</div>

				<div class="py-4 shadow-cs2">
					<div class="flex flex-nowrap">
						<svg :class="getSVGColorClass('water', markerReports.water.flag)"
								 class="mr-1.5 my-auto w-6" width="16" height="21" viewBox="0 0 16 21" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M8.35538 1.00411C8.12038 0.961683 7.87968 0.961683 7.64467 1.00411C7.04751 1.11193 6.66014 1.51137 6.39808 1.85193C6.14541 2.18028 5.88192 2.62832 5.59219 3.12099L5.59218 3.121L5.5624 3.17164L3.89408 6.00778C2.68525 8.0628 1.74204 10.2629 1.08705 12.5554C-0.122083 16.7873 3.05554 21 7.45684 21H8.54321C12.9445 21 16.1221 16.7873 14.913 12.5554C14.258 10.2629 13.3148 8.0628 12.106 6.00778L10.4377 3.17164L10.4079 3.12098C10.1181 2.62832 9.85464 2.18028 9.60197 1.85193C9.33991 1.51137 8.95254 1.11193 8.35538 1.00411ZM7.28627 4.18568C7.61571 3.62563 7.81605 3.28874 7.98312 3.07162L8.00003 3.04996L8.01693 3.07162C8.18401 3.28874 8.38434 3.62563 8.71379 4.18568L10.3821 7.02182C11.5052 8.93102 12.3814 10.975 12.99 13.1048C13.8341 16.0591 11.6158 19 8.54321 19H7.45684C4.3843 19 2.166 16.0591 3.0101 13.1048C3.61861 10.975 4.49489 8.93102 5.61795 7.02182L7.28627 4.18568ZM7.0341 15.2588C6.89116 14.7253 6.34282 14.4088 5.80936 14.5517C5.27589 14.6946 4.95931 15.243 5.10225 15.7764C5.27317 16.4143 5.64981 16.978 6.17374 17.38C6.69768 17.7821 7.33962 18 8.00003 18C8.55231 18 9.00003 17.5523 9.00003 17C9.00003 16.4477 8.55231 16 8.00003 16C7.77989 16 7.56591 15.9273 7.39127 15.7933C7.21662 15.6593 7.09108 15.4714 7.0341 15.2588Z"/>
						</svg>

						<p class="grow font-semibold  my-auto uppercase"
							 :class="getTextColorClass('water', markerReports.water.flag)">
							{{markerReports.water.flag}}
						</p>
						<p class="text-gray-c-500 my-auto font-normal px-1">
							{{(new Date()).toLocaleString()}}
						</p>
					</div>
					<div class="min-h-min bg-gray-c-200 text-gray-c-500 p-2 rounded-sm mt-2" v-if="markerReports.water.description">
						<span>
							{{ markerReports.water.description }}
						</span>
					</div>
				</div>

				<div class="py-4 shadow-cs2">
					<div class="flex flex-nowrap">
						<svg :class="getSVGColorClass('fuelStation',markerReports.fuelStation.flag)"
								 class="mr-1.5 my-auto w-6" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M4.2 2C3.88908 2 3.58624 2.12611 3.35937 2.35813C3.13176 2.59091 3 2.91132 3 3.25V8H12V3.25C12 2.91132 11.8682 2.59091 11.6406 2.35813C11.4138 2.12611 11.1109 2 10.8 2H4.2ZM12 10H3V18H12V10ZM1 9V3.25C1 2.39521 1.33181 1.57102 1.92936 0.959892C2.52765 0.347998 3.34396 0 4.2 0H10.8C11.656 0 12.4723 0.347998 13.0706 0.959892C13.6682 1.57102 14 2.39521 14 3.25V7.65217H14.1667C15.0407 7.65217 15.8851 7.98831 16.5124 8.5962C17.1409 9.20512 17.5 10.0378 17.5 10.913V14.3043C17.5 14.4785 17.5711 14.6521 17.7084 14.7852C17.8468 14.9193 18.0411 15 18.25 15C18.4589 15 18.6532 14.9193 18.7916 14.7852C18.9289 14.6521 19 14.4785 19 14.3043V8C18.3088 8 17.7765 7.5888 17.4608 7.11536C17.1456 6.64246 17 6.05963 17 5.5V4.8769L15.8041 3.71817C15.4075 3.33385 15.3975 2.70077 15.7818 2.30413C16.1661 1.9075 16.7992 1.89751 17.1959 2.28183L17.9389 3.00183C17.9591 3.00062 17.9795 3 18 3C18.5523 3 19 3.44772 19 4V4.02993L20.6959 5.67313C20.8903 5.8615 21 6.12062 21 6.3913V7V14.3043C21 15.0296 20.7023 15.7186 20.1833 16.2215C19.6653 16.7234 18.9693 17 18.25 17C17.5307 17 16.8347 16.7234 16.3167 16.2215C15.7977 15.7186 15.5 15.0296 15.5 14.3043V10.913C15.5 10.589 15.3674 10.2716 15.1207 10.0325C14.8729 9.79243 14.5303 9.65217 14.1667 9.65217H14V18C14.5523 18 15 18.4477 15 19C15 19.5523 14.5523 20 14 20H13H2H1C0.447715 20 0 19.5523 0 19C0 18.4477 0.447715 18 1 18V9Z"/>
						</svg>

						<p class="grow font-semibold my-auto uppercase"
							 :class="getTextColorClass('fuelStation',markerReports.fuelStation.flag)">
							{{markerReports.fuelStation.flag}}
							<span v-if="markerReports.fuelStation !== `none`" class="text-gray-c-500 font-semibold">
					( {{markerReports.fuelStation.distance.toFixed(2)}} KM )
				</span>
						</p>
						<p class="text-gray-c-500 my-auto font-normal px-1">
							{{(new Date()).toLocaleString()}}
						</p>
					</div>
					<div class="min-h-min bg-gray-c-200 text-gray-c-500 p-2 rounded-sm mt-2" v-if="markerReports.fuelStation.description">
						<span>
							{{ markerReports.fuelStation.description }}
						</span>
					</div>
				</div>

				<div class="py-4 shadow-cs2">
					<div class="flex flex-nowrap">
						<svg :class="getSVGColorClass('hospital',markerReports.hospital.flag)"
								 class="mr-1.5 my-auto w-6" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1711 0.879974C20.5548 0.242712 19.7023 0.00221022 18.7962 0.0021859H18.796L18.7956 0.00218572L18.7935 0.002185L18.7851 0.00218238L18.7517 0.00217195L18.6216 0.0021319L18.1277 0.0019842L16.365 0.00149431C14.9063 0.00111003 12.9613 0.000648993 11.0165 0.000341552C9.07168 3.41711e-05 7.12694 -0.000119549 5.66866 0.000111002C4.93955 0.000226337 4.33186 0.000437695 3.90652 0.000774103L3.41215 0.00137748L3.27991 0.00176378L3.24164 0.00200989L3.2282 0.00220038C2.35353 0.00429251 1.50754 0.233036 0.881581 0.847944C0.249479 1.46888 0 2.32777 0 3.25471V18.8447C0 19.7123 0.22348 20.5462 0.832797 21.1583C1.44295 21.7713 2.2787 22 3.15779 22H18.841C19.7072 22 20.5461 21.7871 21.1618 21.177C21.7792 20.5651 22 19.7247 22 18.8447V3.25471C22 2.36682 21.7816 1.51118 21.1711 0.879974ZM18.796 2.00219H18.7957L18.796 1.00219C18.7957 2.00219 18.7957 2.00219 18.7955 2.00219L18.795 2.00219L18.7929 2.00218L18.7844 2.00218L18.7511 2.00217L18.621 2.00213L18.1271 2.00198L16.3645 2.00149C14.9058 2.00111 12.9609 2.00065 11.0162 2.00034C9.07141 2.00003 7.12692 1.99988 5.66897 2.00011H5.66749L5.66958 2.00219H3.24033C2.68516 2.00219 2.41591 2.14427 2.28314 2.2747C2.15361 2.40194 2 2.66931 2 3.25471V18.8447C2 19.3917 2.13893 19.6355 2.25027 19.7474C2.36077 19.8584 2.60392 20 3.15779 20H18.841C19.4079 20 19.6485 19.861 19.754 19.7564C19.8578 19.6535 20 19.4163 20 18.8447V3.25471C20 2.66716 19.8555 2.39652 19.7334 2.27033C19.6173 2.15023 19.3679 2.00219 18.796 2.00219ZM10.257 6C9.70468 6 9.25697 6.44771 9.25697 7V9.27167H7C6.44772 9.27167 6 9.71938 6 10.2717V11.7341C6 12.2864 6.44772 12.7341 7 12.7341H9.27017V15C9.27017 15.5523 9.71789 16 10.2702 16H11.7563C12.3086 16 12.7563 15.5523 12.7563 15V12.7341H15C15.5523 12.7341 16 12.2864 16 11.7341V10.2717C16 9.71938 15.5523 9.27167 15 9.27167H12.7298V7C12.7298 6.44772 12.2821 6 11.7298 6H10.257Z"/>
						</svg>

						<p class="grow font-semibold my-auto uppercase"
							 :class="getTextColorClass('hospital',markerReports.hospital.flag)">
							{{markerReports.hospital.flag}}
							<span v-if="markerReports.hospital !== `зачинено`" class="text-gray-c-500 font-semibold">
					( {{markerReports.hospital.distance.toFixed(2)}} KM )
				</span>
						</p>
						<p class="text-gray-c-500 my-auto font-normal px-1">
							{{(new Date()).toLocaleString()}}
						</p>
					</div>
					<div class="min-h-min bg-gray-c-200 text-gray-c-500 p-2 rounded-sm" v-if="markerReports.hospital.description">
						<span>
							{{ markerReports.hospital.description }}
						</span>
					</div>
				</div>
			</div>
			<!--	  #endRegion-->

<!--			<button-1 v-if="isAuth" class="mt-4 w-full">
				Повідомити про статус
			</button-1>-->
			<!--	  #region Form-->
			<div class="my-6 text-h3 mobile:text-h4">
				<label for="issueMessage" class="text-grey font-normal text-justify block">
					Буде корисно, якщо ви повідомите нам через цю форму про будь-які проблеми, пов’язані з використанням нашого сервісу.
				</label>
				<div class="h-min">
		  	<textarea id="issueMessage"
									class="min-h-[68px] resize-none h-max w-full border-gray-c-300 border rounded-lg px-4 py-2 my-4"
									placeholder="Залишити повідомлення..." v-model="issueMessage"></textarea>
					<button @click="this.Show(issueMessage)"
									:disabled="this.isDisabled"
									:class="{'bg-gray-c-200 text-gray-c-400' : isDisabled,
											'bg-gray-c-200 text-gray-c-600 ' : !isDisabled,
											 'hover:text-gray-c-500 active:bg-gray-c-300 active:text-gray-c-600' : !isDisabled}"
									class="block border rounded-lg px-[50px] py-2 font-medium">
						Відправити
					</button>
				</div>
			</div>
			<!--	  #endregion-->
		</div>
		<Contacts/>
	</div>
</template>

<script>
import SVG_status_list from "../../ComponentsSVG/SVG_status_list.vue";
import {getSVGColorClass, getTextColorClass, Wait} from "../../../Scripts/Helper.js";
import {mapGetters, mapMutations, mapState} from "vuex";
import Button2 from "../../Buttons/Button_2.vue";
import api from "../../../api/index.js";
import ModalTemplate from "../../Modals/ModalTemplate.vue";
import Contacts from "../UserSidebar/Contacts.vue";
import SuccessMessage from "../../Modals/SuccessMessage.vue";
import AwaitModal from "../../Modals/AwaitModal.vue";
import ErrorModal from "../../Modals/ErrorModal.vue";


export default {
	name: "RequestCompletedPreview",
	components: {
		ErrorModal,
		AwaitModal,
		SuccessMessage,
		Contacts,
		ModalTemplate,
		Button2,
		SVG_status_list,
	},
	data : function () {
		return {
			issueMessage: "",
			isPushingMessageVisible : false,
			isResultMessageVisible : false,
			isLeaveModalVisible : false,
			question: "Ви не зберегли інформацію. Якщо ви покинете сторінку інформацію буде втрачено.",
			isPageLeaveConfirmed : false,
			targetLeaveRef : ""
		}
	},
	computed : {
		...mapState({
			markerReports: state => state.reports.selectedLocationRequest.reports,
			requestedMarker: state => state.reports.selectedLocationRequest,
		}),
		...mapGetters(["isAuth"]),
		isDisabled(){
			return this.issueMessage.length < 10;
		},
	},
	methods : {
		...mapMutations(["setSelectedMarker"]),
		async SaveAndPublish(){
			this.isPushingMessageVisible = true;
			let payload ={
				location_id : this.requestedMarker.id,
				...this.markerReports
			}
			await api.locations.submitLocationReport(payload)
				.then(res=>{
					this.setSelectedMarker(res.data);
					this.closePushingModal();
					this.isResultMessageVisible = true;
				})
				.catch(err=>{
					this.PushingErrorHandler(err)
				})
		},
		closePushingModal(){
			this.isPushingMessageVisible = false;
		},
		closeResultModal(){
			this.isResultMessageVisible = false;
			this.isPageLeaveConfirmed = true;
			this.$router.push('overview');
		},
		Show(string){
			alert(string);
		},
		getTextColorClass(field, status){
			return getTextColorClass(field, status)
		},
		getSVGColorClass(field, status){
			return getSVGColorClass(field, status)
		},
		closeLeavePageConfirmModal(){
			this.isLeaveModalVisible = false;
		},
		ModalAccept(){
			this.isPageLeaveConfirmed = true;
			this.$router.push(this.targetLeaveRef);
		},
		ModalCancel(){
			this.isPageLeaveConfirmed = false;
			this.targetLeaveRef = ""
		},
		async PushingErrorHandler(err){
			this.closePushingModal();
			setTimeout(()=> {
				alert("Помилка при завантаженні даних");
			}, 10)
		}
	},
	beforeRouteLeave(to, from, next){
		if(this.isPageLeaveConfirmed)
			next();
		else {
			this.isLeaveModalVisible = true;
			this.targetLeaveRef = to.fullPath;
			next(false);
		}
	}
}
</script>


