# frozen_string_literal: true

# Communication layer for Schedules
class SchedulesController < ApplicationController
  before_action :set_schedule, only: %i[show update destroy]

  # # GET /schedules
  # # GET /schedules.json
  def index
    @schedules = Schedule.all
    render json: { schedules: @schedules }

  end

  # GET /schedules/1
  # GET /schedules/1.json
  def show
    render json: { schedule: @schedule }
  end

  # POST /schedules
  # POST /schedules.json
  def create
    @schedule = Schedule.new(schedule_params)

    if @schedule.save
      render :show, status: :created, location: @schedule
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /schedules/1
  # PATCH/PUT /schedules/1.json
  def update
    if @schedule.update(schedule_params)
      render :show, status: :ok, location: @schedule
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  # DELETE /schedules/1
  # DELETE /schedules/1.json
  def destroy
    @schedule.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_schedule
    @schedule = Schedule.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def schedule_params
    params.require(:schedule).permit(:date, :time, :event, :tournament_id)
  end
end
