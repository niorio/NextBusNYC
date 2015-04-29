namespace :db do
  desc 'populates db with stops from txt files'
  task :seed_stops do
    def parse_file(file)
      contents = File.readlines(file)
      contents.each do |line|
        stop = Stop.new
        stop.id = line[0].to_s
        stop.name = line[1][1..-2]
        stop.latitude = line[3].to_f
        stop.longitude = line[4].to_f
        stop.save!
      end
    end

    parse_file("#{Rails.root}/app/assets/stops/manhattan_stops.txt")
    parse_file("#{Rails.root}/app/assets/stops/bronx_stops.txt")
    parse_file("#{Rails.root}/app/assets/stops/queens_stops.txt")
    parse_file("#{Rails.root}/app/assets/stops/brooklyn_stops.txt")
    parse_file("#{Rails.root}/app/assets/stops/si_stops.txt")
  end

end
