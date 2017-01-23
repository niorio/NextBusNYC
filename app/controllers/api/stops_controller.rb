class Api::StopsController < ApplicationController

  def nearby
    here = Geokit::LatLng.new(params[:lat], params[:long])
    @stops = Stop.by_distance({ origin: here }).limit(12)
    render json: @stops
  end

  def buses
    buses = Stop.fetch_buses_for_stop(params[:stop_id])
    render json: buses
  end

end
