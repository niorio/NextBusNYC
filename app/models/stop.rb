class Stop < ActiveRecord::Base
  validates :latitude, :longitude, :name, presence: true

  acts_as_mappable :lat_column_name => :latitude,
                   :lng_column_name => :longitude,
                   :distance_field_name => :distance

  def self.fetch_buses_for_stop(stop_id)
    response = RestClient.get 'http://bustime.mta.info/api/siri/stop-monitoring.json',
      { params: {
        key: ENV['BUS_TIME_KEY'],
        MonitoringRef: stop_id,
        MaximumStopVisits: 4
      } }
    parse_bus_data(response)
  end

  private
  def self.parse_bus_data(data)
    data = JSON.parse(data)
    stop_data = data['Siri']['ServiceDelivery']['StopMonitoringDelivery']

    bus_data = []
    stop_data.each {|line| bus_data += line['MonitoredStopVisit']}
    buses = []

    bus_data.each do |obj|
      mvj = obj['MonitoredVehicleJourney']
      bus = {}
      bus['line'] = mvj['PublishedLineName']
      bus['distance'] = mvj['MonitoredCall']['Extensions']['Distances']['PresentableDistance']
      bus['destination'] = mvj['DestinationName']

      if mvj['ProgressRate'] == "normalProgress"
        bus['status'] = "moving"
      elsif mvj['ProgressStatus'] && mvj['ProgressStatus'].include?('layover')
        bus['status'] = "layover"
      else
        bus['status'] = "not moving"
      end

      buses << bus
    end

    buses
  end

end
