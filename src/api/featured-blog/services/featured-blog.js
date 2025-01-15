'use strict';

/**
 * featured-blog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::featured-blog.featured-blog');
