class Api::StopsController < ApplicationController

  def nearby
    here = Geokit::LatLng.new(params[:lat], params[:long])
    @stops = Stop.by_distance({ origin: here }).limit(12)
    render json: @stops
  end

  def buses
    response = RestClient.get 'http://bustime.mta.info/api/siri/stop-monitoring.json',
      { params: {
        key: ENV['BUS_TIME_KEY'],
        MonitoringRef: params[:stop_id],
        MaximumStopVisits: 5
      } }

    buses = Stop.parse_bus_data(response)

    render json: buses

  end

end
