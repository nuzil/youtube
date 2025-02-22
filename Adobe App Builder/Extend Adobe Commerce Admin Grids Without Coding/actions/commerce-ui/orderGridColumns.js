/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const { getOrderStatuses } = require('../order/storage');
const { Core } = require('@adobe/aio-sdk');
const logger = Core.Logger('order-custom-grid-columns', { level: 'error' });

/**
 * Main function to get order grid columns with their statuses.
 *
 * @returns {object} Response object containing status code and order grid columns.
 */
/* eslint-disable */
export async function main() {
  const orderGridColumns = {
    orderGridColumns: {}
  };

  try {
    const statuses = await getOrderStatuses();

    for (const incrementId in statuses) {
      if (statuses.hasOwnProperty(incrementId)) {
        orderGridColumns.orderGridColumns[incrementId] = {
          hubspot_export_status: statuses[incrementId]
        };
      }
    }

    return {
      statusCode: 200,
      body: orderGridColumns
    };
  } catch (error) {
    logger.error(`There was en error during order export status retrieval. Error message: ${error.message}`);
    return {
      statusCode: 500,
      body: { error: `There was en error during order export status retrieval. Error message: ${error.message}` }
    };
  }
}
/* eslint-enable */