import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 * @param {Class<Pagination<NodesType>>['connection']>}
 */
export function PaginatedResourceSection({
  connection,
  children,
  resourcesClassName,
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div>
            <div className="paginated-resource-section__controls paginated-resource-section__controls--top">
              <PreviousLink className="paginated-resource-section__button">
                {isLoading ? 'Loading...' : <span>Load previous</span>}
              </PreviousLink>
            </div>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <div className="paginated-resource-section__controls paginated-resource-section__controls--bottom">
              <NextLink className="paginated-resource-section__button">
                {isLoading ? 'Loading...' : <span>Load more</span>}
              </NextLink>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
