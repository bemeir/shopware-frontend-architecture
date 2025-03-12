(window["webpackJsonpPluginswag-pay-pal"]=window["webpackJsonpPluginswag-pay-pal"]||[]).push([[850],{6375:function(){},9850:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return d}}),a(7770);let{Filter:n,Utils:s}=Shopware,{Criteria:i}=Shopware.Data,{capitalizeString:l}=Shopware.Utils.string;var d=Shopware.Component.wrapComponentConfig({template:'{% block swag_paypal_disputes_detail %}\n<sw-page class="swag-paypal-disputes-detail">\n\n    {% block swag_paypal_disputes_detail_smart_bar_header %}\n    <template #smart-bar-header>\n\n        {% block swag_paypal_disputes_detail_smart_bar_header_title %}\n        <h2>\n\n            {% block swag_paypal_disputes_detail_smart_bar_header_title %}\n                {{ $tc(\'swag-paypal-disputes.detail.title\') }}\n            {% endblock %}\n\n            {% block swag_paypal_disputes_detail_smart_bar_header_dispute_id %}\n                {{ disputeId }}\n            {% endblock %}\n\n            {% block swag_paypal_disputes_detail_smart_bar_header_title_addition %}\n                {{ $tc(\'swag-paypal-disputes.detail.titleAddition\') }}\n            {% endblock %}\n\n        </h2>\n        {% endblock %}\n\n    </template>\n    {% endblock %}\n\n    {% block swag_paypal_disputes_detail_content %}\n    <template #content>\n        <sw-card-view>\n\n            {% block swag_paypal_disputes_detail_content_details %}\n            <sw-card\n                position-identifier="swag-paypal-disputes-detail-content-details"\n                :isLoading="isLoading"\n                :title="$tc(\'swag-paypal-disputes.detail.mainFieldsCardTitle\')"\n            >\n\n                {% block swag_paypal_disputes_detail_content_details_fields %}\n                <template v-if="dispute">\n\n                    {% block swag_paypal_disputes_detail_content_details_fields_external_link %}\n                    <div class="swag-paypal-disputes-detail__links">\n                        <sw-external-link :href="externalDetailPageLink">\n                            {{ $tc(\'swag-paypal-disputes.detail.externalLinkText\') }}\n                        </sw-external-link>\n                    </div>\n                    {% endblock %}\n\n                    {% block swag_paypal_disputes_detail_content_details_fields_order_module_link %}\n                    <div class="swag-paypal-disputes-detail__links">\n                        <router-link\n                            v-if="orderModuleLink"\n                            :to="orderModuleLink"\n                            target="_blank"\n                            rel="noopener"\n                        >\n                            {{ $tc(\'swag-paypal-disputes.detail.orderModuleLinkText\') }}\n                        </router-link>\n                    </div>\n                    {% endblock %}\n\n                    {% block swag_paypal_disputes_detail_content_details_fields_separator %}\n                    <hr class="swag-paypal-disputes-detail__separator">\n                    {% endblock %}\n\n                    {% block swag_paypal_disputes_detail_content_details_fields_id %}\n                    <sw-text-field\n                        :value="dispute.dispute_id"\n                        :label="$tc(\'swag-paypal-disputes.common.dispute_id\')"\n                        disabled\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_disputes_detail_content_details_fields_update_time %}\n                    <sw-text-field\n                        :value="formatDate(dispute.update_time)"\n                        :label="$tc(\'swag-paypal-disputes.common.update_time\')"\n                        disabled\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_disputes_detail_content_details_fields_due_date %}\n                    <sw-text-field\n                        v-if="dispute.seller_response_due_date || dispute.buyer_response_due_date"\n                        :value="getDueDate(dispute.seller_response_due_date, dispute.buyer_response_due_date)"\n                        :label="$tc(\'swag-paypal-disputes.common.response_due_date.label\')"\n                        disabled\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_disputes_detail_content_details_fields_status %}\n                    <sw-text-field\n                        :value="`${formatTechnicalText(dispute.status)} (${formatTechnicalText(dispute.reason)})`"\n                        :label="$tc(\'swag-paypal-disputes.common.status\')"\n                        disabled\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_disputes_detail_content_details_fields_dispute_life_cycle_stage %}\n                    <sw-text-field\n                        :value="formatTechnicalText(dispute.dispute_life_cycle_stage)"\n                        :label="$tc(\'swag-paypal-disputes.common.dispute_life_cycle_stage\')"\n                        :class="getInquiryClass(dispute.dispute_life_cycle_stage)"\n                        disabled\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_disputes_detail_content_details_fields_dispute_amount %}\n                    <sw-text-field\n                        :value="`${dispute.dispute_amount.value} ${dispute.dispute_amount.currency_code}`"\n                        :label="$tc(\'swag-paypal-disputes.common.dispute_amount\')"\n                        disabled\n                    />\n                    {% endblock %}\n\n                </template>\n                {% endblock %}\n\n            </sw-card>\n            {% endblock %}\n\n            {% block swag_paypal_disputes_detail_content_raw_data %}\n            <sw-card\n                position-identifier="swag-paypal-disputes-detail-content-raw-data"\n                :isLoading="isLoading"\n                :title="$tc(\'swag-paypal-disputes.detail.rawDataCardTitle\')"\n            >\n\n                {% block swag_paypal_disputes_detail_content_raw_data_content %}\n                <template v-if="dispute">\n\n                    {% block swag_paypal_disputes_detail_content_raw_data_text %}\n                    <sw-textarea-field\n                        :value="JSON.stringify(dispute, null, 2)"\n                        disabled\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_disputes_detail_content_raw_data_copy_button %}\n                    <sw-button @click="copyToClipboard">\n                        {{ $tc(\'swag-paypal-disputes.detail.copyButtonLabel\') }}\n                    </sw-button>\n                    {% endblock %}\n\n                </template>\n                {% endblock %}\n\n            </sw-card>\n            {% endblock %}\n\n        </sw-card-view>\n    </template>\n    {% endblock %}\n\n</sw-page>\n{% endblock %}\n',inject:["SwagPayPalDisputeApiService","systemConfigApiService","repositoryFactory"],mixins:[Shopware.Mixin.getByName("swag-paypal-notification")],props:{disputeId:{type:String,required:!0},salesChannelId:{type:String,required:!1,default:null}},data(){return{isLoading:!1,dispute:null,resolutionCenterUrl:"https://www.paypal.com/resolutioncenter",orderModuleLink:null}},computed:{orderTransactionRepository(){return this.repositoryFactory.create("order_transaction")},orderTransactionCriteria(){let e=this.dispute?.disputed_transactions?.[0]?.custom;if(!e)return null;let t=JSON.parse(e)?.orderTransactionId??e;if("string"!=typeof t||32!==t.length)return null;let a=new i(1,1);return a.setIds([t]),a},externalDetailPageLink(){return`${this.resolutionCenterUrl}/${this.dispute?.dispute_id??""}`},dateFilter(){return n.getByName("date")}},created(){this.createdComponent()},methods:{async createdComponent(){this.isLoading=!0,(await this.systemConfigApiService.getValues("SwagPayPal.settings"))["SwagPayPal.settings.sandbox"]&&(this.resolutionCenterUrl="https://www.sandbox.paypal.com/resolutioncenter"),this.getDetail()},getDetail(){this.SwagPayPalDisputeApiService.detail(this.disputeId,this.salesChannelId).then(e=>{this.dispute=e,this.setLinkToOrderModule(),this.isLoading=!1}).catch(this.handleError.bind(this))},handleError(e){this.createNotificationFromError({errorResponse:e,title:"swag-paypal-disputes.list.errorTitle"}),this.isLoading=!1},async setLinkToOrderModule(){this.orderTransactionCriteria||(this.orderModuleLink=null);let e=(await this.orderTransactionRepository.search(this.orderTransactionCriteria))[0];null!==e&&(this.orderModuleLink={name:"sw.order.detail.general",params:{id:e.orderId}})},formatTechnicalText(e){return l(e).replace(/_/g," ")},getInquiryClass(e){return"INQUIRY"===e?"swag-paypal-disputes-detail__stage-inquiry":"swag-paypal-disputes-detail__stage-other"},getDueDate(e,t){return null!==e?`${this.$tc("swag-paypal-disputes.common.response_due_date.seller")}: ${this.formatDate(e)}`:null!==t?`${this.$tc("swag-paypal-disputes.common.response_due_date.buyer")}: ${this.formatDate(t)}`:""},copyToClipboard(){if(null!==this.dispute)try{s.dom.copyToClipboard(JSON.stringify(this.dispute)),this.createNotificationInfo({message:this.$tc("global.sw-field.notification.notificationCopySuccessMessage")})}catch(e){this.createNotificationError({message:this.$tc("global.sw-field.notification.notificationCopyFailureMessage")})}},formatDate(e){return this.dateFilter(e,{hour:"2-digit",minute:"2-digit",second:"2-digit"})}}})},7770:function(e,t,a){var n=a(6375);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,a(534).A)("62a76127",n,!0,{})}}]);